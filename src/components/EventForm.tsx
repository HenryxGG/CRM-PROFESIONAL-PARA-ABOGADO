import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, Loader2, MapPin, Trash2 } from 'lucide-react';
import type { CalendarEvent, EventType, EventStatus } from '../types/event';
import { useClients } from '../hooks/useClients';
import { useCases } from '../hooks/useCases';

interface EventFormProps {
    initialData?: CalendarEvent;
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    selectedDate?: Date;
}

const EventForm: React.FC<EventFormProps> = ({ initialData, isOpen, onClose, onSave, onDelete, selectedDate }) => {
    const { clients } = useClients();
    const { cases } = useCases();

    const [formData, setFormData] = useState<Partial<CalendarEvent>>({
        title: '',
        type: 'audiencia',
        status: 'pendiente',
        start_time: '',
        end_time: '',
        description: '',
        location: '',
        client_id: '',
        case_id: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Default to selected date or now
            const now = selectedDate ? new Date(selectedDate) : new Date();
            now.setMinutes(0, 0, 0); // Round to hour
            const isoStart = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm format for input

            const end = new Date(now);
            end.setHours(end.getHours() + 1);
            const isoEnd = end.toISOString().slice(0, 16);

            setFormData({
                title: '',
                type: 'audiencia',
                status: 'pendiente',
                start_time: isoStart,
                end_time: isoEnd,
                description: '',
                location: '',
                client_id: '',
                case_id: '',
            });
        }
    }, [initialData, isOpen, selectedDate]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!formData.title) throw new Error('El título es requerido');
            if (!formData.start_time) throw new Error('La fecha de inicio es requerida');

            await onSave(formData as CalendarEvent);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white dark:bg-[#111418] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {initialData ? 'Editar Evento' : 'Nuevo Evento'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-3">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Título</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ej. Audiencia Preliminar, Reunión con Cliente..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo</label>
                            <select
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                            >
                                <option value="audiencia">Audiencia</option>
                                <option value="reunion">Reunión</option>
                                <option value="vencimiento">Vencimiento</option>
                                <option value="tarea">Tarea</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estado</label>
                            <select
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="realizado">Realizado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Inicio</label>
                            <input
                                type="datetime-local"
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white text-sm"
                                value={formData.start_time}
                                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fin (Aprox)</label>
                            <input
                                type="datetime-local"
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white text-sm"
                                value={formData.end_time}
                                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ubicación / Link</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <MapPin size={16} />
                            </span>
                            <input
                                type="text"
                                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Sala de audiencias, Oficinas, Zoom..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Vincular Cliente</label>
                            <select
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white text-sm"
                                value={formData.client_id || ''}
                                onChange={(e) => setFormData({ ...formData, client_id: e.target.value || undefined })}
                            >
                                <option value="">(Ninguno)</option>
                                {clients.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Vincular Caso</label>
                            <select
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white text-sm"
                                value={formData.case_id || ''}
                                onChange={(e) => setFormData({ ...formData, case_id: e.target.value || undefined })}
                            >
                                <option value="">(Ninguno)</option>
                                {cases.map(c => (
                                    <option key={c.id} value={c.id}>{c.code} - {c.client_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notas</label>
                        <textarea
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white resize-none h-16"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                        {initialData && onDelete ? (
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.confirm('¿Eliminar este evento?')) {
                                        onDelete(initialData.id);
                                    }
                                }}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                disabled={loading}
                            >
                                <Trash2 size={18} />
                                <span>Eliminar</span>
                            </button>
                        ) : <div></div>}

                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
                                disabled={loading}
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                <span>Guardar</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default EventForm;
