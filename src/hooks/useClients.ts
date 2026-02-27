import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Client } from '../types/client';

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setClients(data as Client[] || []);
        } catch (err: any) {
            console.error('Error fetching clients:', err);
            // Fallback for demo if no backend connection
            if (clients.length === 0 && err.message?.includes('fetch')) {
                // Keep empty or mock if needed
            }
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addClient = async (client: Omit<Client, 'id'>) => {
        try {
            const { data, error } = await supabase
                .from('clients')
                // @ts-ignore
                .insert([client])
                .select()
                .single();

            if (error) throw error;
            setClients([data as Client, ...clients]);
        } catch (err: any) {
            console.error('Error adding client:', err);
            throw err;
        }
    };

    const updateClient = async (updatedClient: Client) => {
        try {
            const { error } = await supabase
                .from('clients')
                // @ts-ignore
                .update({
                    name: updatedClient.name,
                    type: updatedClient.type,
                    identification: updatedClient.identification,
                    email: updatedClient.email,
                    phone: updatedClient.phone,
                    address: updatedClient.address,
                    status: updatedClient.status
                })
                .eq('id', updatedClient.id);

            if (error) throw error;
            setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
        } catch (err: any) {
            console.error('Error updating client:', err);
            throw err;
        }
    };

    const deleteClient = async (id: string) => {
        try {
            const { error } = await supabase
                .from('clients')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setClients(clients.filter(c => c.id !== id));
        } catch (err: any) {
            console.error('Error deleting client:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return { clients, loading, error, addClient, updateClient, deleteClient, refreshClients: fetchClients };
};
