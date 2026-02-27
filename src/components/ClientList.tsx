import React from 'react';
import { Edit2, Trash2, Phone, Mail } from 'lucide-react';
import type { Client } from '../types/client';

interface ClientListProps {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-crm-slate dark:text-slate-400 uppercase bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-medium">Nombre / Razón Social</th>
                            <th className="px-6 py-4 font-medium">Identificación</th>
                            <th className="px-6 py-4 font-medium">Contacto</th>
                            <th className="px-6 py-4 font-medium">Estado</th>
                            <th className="px-6 py-4 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <span className="font-semibold text-crm-navy dark:text-white block">{client.name}</span>
                                        <span className="text-xs text-crm-slate bg-gray-100 px-2 py-0.5 rounded-full inline-block mt-1">
                                            {client.type === 'natural' ? 'Natural' : 'Jurídica'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-crm-slate">
                                    {client.identification}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        {client.email && (
                                            <div className="flex items-center text-crm-slate text-xs">
                                                <Mail size={14} className="mr-1.5" />
                                                {client.email}
                                            </div>
                                        )}
                                        {client.phone && (
                                            <div className="flex items-center text-crm-slate text-xs">
                                                <Phone size={14} className="mr-1.5" />
                                                {client.phone}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${client.status === 'activo'
                                        ? 'bg-green-50 text-green-700 border-green-100'
                                        : client.status === 'prospecto'
                                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                                            : 'bg-gray-50 text-gray-600 border-gray-200'
                                        }`}>
                                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => onEdit(client)}
                                            className="p-1.5 text-gray-400 hover:text-crm-navy hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(client.id)}
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

                {clients.length === 0 && (
                    <div className="p-12 text-center text-crm-slate">
                        <Users size={48} className="mx-auto mb-4 text-gray-200" />
                        <p className="text-lg font-medium">No hay clientes registrados</p>
                        <p className="text-sm">Comienza agregando un nuevo cliente a tu cartera.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper icon
const Users = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

export default ClientList;
