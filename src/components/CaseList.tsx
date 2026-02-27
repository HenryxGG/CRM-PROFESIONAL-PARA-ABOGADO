import React from 'react';
import { Edit2, Trash2, Scale, User, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Case, CaseStatus } from '../types/case';

interface CaseListProps {
    cases: Case[];
    onEdit: (caseItem: Case) => void;
    onDelete: (id: string) => void;
}

const CaseList: React.FC<CaseListProps> = ({ cases, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const getStatusColor = (status: CaseStatus) => {
        switch (status) {
            case 'iniciado': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'en_tramite': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'suspendido': return 'bg-red-100 text-red-800 border-red-200';
            case 'archivado': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'finalizado': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-crm-slate dark:text-slate-400 uppercase bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-medium">Código / Judicial</th>
                            <th className="px-6 py-4 font-medium">Cliente</th>
                            <th className="px-6 py-4 font-medium">Tipo / Estado</th>
                            <th className="px-6 py-4 font-medium">Ubicación</th>
                            <th className="px-6 py-4 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {cases.map((caseItem) => (
                            <tr
                                key={caseItem.id}
                                className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                onClick={() => navigate(`/cases/${caseItem.id}`)}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="mr-3 p-2 bg-gray-50 dark:bg-slate-800 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-slate-700 transition-colors">
                                            <Scale size={18} className="text-crm-navy dark:text-slate-300" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-crm-navy dark:text-white">{caseItem.code || 'Sin Código'}</div>
                                            <div className="text-xs text-gray-400">{caseItem.judicial_number || 'No especificado'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <User size={14} className="mr-1.5 text-gray-400" />
                                        <span className="font-medium text-gray-700">{caseItem.client_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="capitalize text-gray-700">{caseItem.type.replace('_', ' ')}</div>
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(caseItem.status)}`}>
                                            {caseItem.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-gray-500">
                                        <MapPin size={14} className="mr-1.5" />
                                        <span>{caseItem.city || '-'}</span>
                                    </div>
                                    <div className="text-xs text-gray-400 pl-5">{caseItem.judicial_unit}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEdit(caseItem); }}
                                            className="p-1.5 text-gray-400 hover:text-crm-navy hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDelete(caseItem.id); }}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {cases.length === 0 && (
                    <div className="p-12 text-center text-crm-slate">
                        <Scale size={48} className="mx-auto mb-4 text-gray-200" />
                        <p className="text-lg font-medium">No hay casos registrados</p>
                        <p className="text-sm">Comienza creando uno nuevo.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseList;
