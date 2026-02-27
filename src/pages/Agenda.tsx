import { useState } from 'react';
import Layout from '../components/Layout';
import CalendarView from '../components/CalendarView';
import EventForm from '../components/EventForm';
import { useEvents } from '../hooks/useEvents';
import { Loader2 } from 'lucide-react';
import Icon from '../components/common/Icon';
import type { CalendarEvent } from '../types/event';

const Agenda = () => {
    const { events, loading, error, addEvent, updateEvent, deleteEvent } = useEvents();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const handleCreate = () => {
        setEditingEvent(undefined);
        setSelectedDate(undefined);
        setIsFormOpen(true);
    };

    const handleDateClick = (date: Date) => {
        setEditingEvent(undefined);
        setSelectedDate(date);
        setIsFormOpen(true);
    };

    const handleEdit = (event: CalendarEvent) => {
        setEditingEvent(event);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        // Confirmation handled in EventForm
        await deleteEvent(id);
        setIsFormOpen(false);
    };

    const handleSave = async (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
        if ('id' in eventData) {
            await updateEvent(eventData);
        } else {
            await addEvent(eventData);
        }
    };

    return (
        <Layout>
            <div className="flex-1 overflow-y-auto hide-scrollbar bg-transparent">
                <div className="px-8 py-6 space-y-8 max-w-7xl mx-auto pb-12">
                    {/* Header alignment for SaaS look */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                        <div className="flex-1">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Agenda Legal</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Vencimientos, audiencias y recordatorios.</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 px-2 lg:px-4">
                            <button
                                onClick={handleCreate}
                                className="flex items-center gap-2 bg-slate-900 dark:bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-lg font-bold text-sm"
                            >
                                <Icon name="calendar_add_on" size={20} />
                                <span>Nuevo Evento</span>
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center shadow-sm">
                            <Icon name="error" className="mr-2" />
                            <span className="font-medium mr-2">Error al cargar eventos:</span> {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 size={32} className="animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                            <CalendarView
                                events={events}
                                onEventClick={handleEdit}
                                onDateClick={handleDateClick}
                            />
                        </div>
                    )}
                </div>
            </div>

            <EventForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                onDelete={handleDelete}
                initialData={editingEvent}
                selectedDate={selectedDate}
            />
        </Layout>
    );
}

export default Agenda;
