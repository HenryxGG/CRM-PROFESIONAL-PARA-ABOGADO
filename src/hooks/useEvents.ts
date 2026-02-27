import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { CalendarEvent } from '../types/event';

export const useEvents = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('events')
                .select(`
          *,
          cases (code),
          clients (name)
        `)
                .order('start_time', { ascending: true });

            if (error) throw error;

            const mappedEvents = data?.map((item: any) => ({
                ...item,
                case_code: item.cases?.code,
                client_name: item.clients?.name
            })) as CalendarEvent[];

            setEvents(mappedEvents || []);
        } catch (err: any) {
            console.error('Error fetching events:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addEvent = async (event: Omit<CalendarEvent, 'id'>) => {
        try {
            const { error } = await supabase
                .from('events')
                // @ts-ignore
                .insert([event])
                .select()
                .single();

            if (error) throw error;
            await fetchEvents();
        } catch (err: any) {
            console.error('Error adding event:', err);
            throw err;
        }
    };

    const updateEvent = async (updatedEvent: CalendarEvent) => {
        try {
            const { error } = await supabase
                .from('events')
                // @ts-ignore
                .update({
                    title: updatedEvent.title,
                    description: updatedEvent.description,
                    start_time: updatedEvent.start_time,
                    end_time: updatedEvent.end_time,
                    type: updatedEvent.type,
                    status: updatedEvent.status,
                    case_id: updatedEvent.case_id || null, // Handle optional relations
                    client_id: updatedEvent.client_id || null,
                    location: updatedEvent.location
                })
                .eq('id', updatedEvent.id);

            if (error) throw error;
            await fetchEvents();
        } catch (err: any) {
            console.error('Error updating event:', err);
            throw err;
        }
    };

    const deleteEvent = async (id: string) => {
        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setEvents(events.filter(e => e.id !== id));
        } catch (err: any) {
            console.error('Error deleting event:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return { events, loading, error, addEvent, updateEvent, deleteEvent, refreshEvents: fetchEvents };
};
