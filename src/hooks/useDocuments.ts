import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Document } from '../types/document';

export const useDocuments = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('documents')
                .select(`
          *,
          cases (code),
          clients (name)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const mappedDocs = data?.map((item: any) => ({
                ...item,
                case_code: item.cases?.code,
                client_name: item.clients?.name
            })) as Document[];

            setDocuments(mappedDocs || []);
        } catch (err: any) {
            console.error('Error fetching documents:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadDocument = async (file: File, caseId?: string, clientId?: string, fileType: string = 'otro') => {
        try {
            setLoading(true);
            // Upload to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Insert Metadata to Table
            const { error: dbError } = await supabase
                .from('documents')
                // @ts-ignore
                .insert([{
                    name: file.name,
                    file_path: filePath,
                    file_type: fileType,
                    case_id: caseId || null,
                    client_id: clientId || null
                }])
                .select()
                .single();

            if (dbError) throw dbError;

            await fetchDocuments();
        } catch (err: any) {
            console.error('Error uploading document:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteDocument = async (id: string, filePath: string) => {
        try {
            // Delete from Storage
            const { error: storageError } = await supabase.storage
                .from('documents')
                .remove([filePath]);

            if (storageError) console.warn('Error deleting file from storage:', storageError);

            // Delete from Table
            const { error } = await supabase
                .from('documents')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setDocuments(documents.filter(d => d.id !== id));
        } catch (err: any) {
            console.error('Error deleting document:', err);
            throw err;
        }
    };

    const getDownloadUrl = async (filePath: string) => {
        const { data } = await supabase.storage.from('documents').createSignedUrl(filePath, 60);
        return data?.signedUrl;
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return { documents, loading, error, uploadDocument, deleteDocument, getDownloadUrl, refreshDocuments: fetchDocuments };
};
