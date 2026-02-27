import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Case } from '../types/case';

export const useCases = () => {
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCases = async () => {
        setLoading(true);
        try {
            // Fetch cases and join with clients to get the name
            const { data, error } = await supabase
                .from('cases')
                .select(`
          *,
          clients (
            name
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Map the nested client name to the flat structure
            const mappedCases = data?.map((item: any) => ({
                ...item,
                client_name: item.clients?.name || 'Cliente Desconocido'
            })) as Case[];

            setCases(mappedCases || []);
        } catch (err: any) {
            console.error('Error fetching cases:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addCase = async (caseItem: Omit<Case, 'id'>) => {
        try {
            const { error } = await supabase
                .from('cases')
                // @ts-ignore
                .insert([caseItem])
                .select()
                .single();

            if (error) throw error;
            // We need to fetch again to get the client name properly joined
            await fetchCases();
        } catch (err: any) {
            console.error('Error adding case:', err);
            throw err;
        }
    };

    const updateCase = async (updatedCase: Case) => {
        try {
            const { error } = await supabase
                .from('cases')
                // @ts-ignore
                .update({
                    code: updatedCase.code,
                    judicial_number: updatedCase.judicial_number,
                    type: updatedCase.type,
                    status: updatedCase.status,
                    client_id: updatedCase.client_id,
                    judicial_unit: updatedCase.judicial_unit,
                    city: updatedCase.city,
                    province: updatedCase.province,
                    opposing_party: updatedCase.opposing_party,
                    description: updatedCase.description,
                    amount: updatedCase.amount,
                    responsible_lawyer_id: updatedCase.responsible_lawyer_id
                })
                .eq('id', updatedCase.id);

            if (error) throw error;
            await fetchCases(); // Refresh to get updates
        } catch (err: any) {
            console.error('Error updating case:', err);
            throw err;
        }
    };

    const deleteCase = async (id: string) => {
        try {
            const { error } = await supabase
                .from('cases')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setCases(cases.filter(c => c.id !== id));
        } catch (err: any) {
            console.error('Error deleting case:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchCases();
    }, []);

    return { cases, loading, error, addCase, updateCase, deleteCase, refreshCases: fetchCases };
};
