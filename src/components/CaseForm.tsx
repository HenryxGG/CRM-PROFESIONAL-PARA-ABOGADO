import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, Loader2 } from 'lucide-react';
import type { Case, CaseType, CaseStatus } from '../types/case';
import { useClients } from '../hooks/useClients';

interface CaseFormProps {
    initialData?: Case;
    isOpen: boolean;
    onClose: () => void;
    onSave: (caseItem: Omit<Case, 'id'> | Case) => Promise<void>;
}

const CaseForm: React.FC<CaseFormProps> = ({ initialData, isOpen, onClose, onSave }) => {
    const { clients } = useClients(); // Fetch clients for the dropdown
    const [formData, setFormData] = useState<Partial<Case>>({
        status: 'iniciado',
        type: 'civil',
        code: '',
        judicial_number: '',
        client_id: '',
        opposing_party: '',
        judicial_unit: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                status: 'iniciado',
                type: 'civil',
                code: '',
                judicial_number: '',
                client_id: '',
                opposing_party: '',
                judicial_unit: '',
                description: '',
            });
        }
    }, [initialData, isOpen]);

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
            if (!formData.client_id) throw new Error('Debe seleccionar un cliente');
            if (!formData.type) throw new Error('Debe seleccionar un tipo de proceso');

            await onSave(formData as Case);
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
            <div className="bg-white dark:bg-[#111418] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-[#111418] z-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {initialData ? 'Editar Proceso' : 'Nuevo Proceso'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cliente <span className="text-red-500">*</span></label>
                            <select
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.client_id}
                                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                                required
                            >
                                <option value="">Seleccione un cliente...</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name} - {client.identification}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contraparte</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.opposing_party}
                                onChange={(e) => setFormData({ ...formData, opposing_party: e.target.value })}
                                placeholder="Demandado / Actor"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Proceso <span className="text-red-500">*</span></label>
                            <select
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as CaseType })}
                            >
                                <option value="civil">Civil</option>
                                <option value="penal">Penal</option>
                                <option value="laboral">Laboral</option>
                                <option value="familia">Familia / Niñez</option>
                                <option value="transito">Tránsito</option>
                                <option value="administrativo">Administrativo</option>
                                <option value="inquilinato">Inquilinato</option>
                                <option value="constitucional">Constitucional</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estado</label>
                            <select
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as CaseStatus })}
                            >
                                <option value="iniciado">Iniciado</option>
                                <option value="en_tramite">En Trámite</option>
                                <option value="suspendido">Suspendido</option>
                                <option value="finalizado">Finalizado</option>
                                <option value="archivado">Archivado</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nro. Juicio (SATJE)</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.judicial_number}
                                onChange={(e) => setFormData({ ...formData, judicial_number: e.target.value })}
                                placeholder="Ej. 17230-2024-00123"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Código Interno</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder="Ej. LEG-001"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Unidad Judicial / Juzgado</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white"
                            value={formData.judicial_unit}
                            onChange={(e) => setFormData({ ...formData, judicial_unit: e.target.value })}
                            placeholder="Ej. Unidad Judicial Civil de Pichincha"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resumen / Pretensión</label>
                        <textarea
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white resize-none h-24"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Descripción breve del caso..."
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
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
                            <span>Guardar Proceso</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default CaseForm;
