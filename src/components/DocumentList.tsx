import React from 'react';
import { FileText, Download, Trash2, File, FileImage } from 'lucide-react';
import type { Document } from '../types/document';

interface DocumentListProps {
    documents: Document[];
    onDelete: (id: string, path: string) => void;
    onDownload: (path: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onDelete, onDownload }) => {
    const getIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) return <FileImage size={18} className="text-purple-500" />;
        if (['pdf'].includes(ext || '')) return <FileText size={18} className="text-red-500" />;
        return <File size={18} className="text-gray-400" />;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-crm-slate uppercase bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-medium">Nombre / Fecha</th>
                            <th className="px-6 py-4 font-medium">Relacionado con</th>
                            <th className="px-6 py-4 font-medium">Tipo</th>
                            <th className="px-6 py-4 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="mr-3 p-2 bg-gray-50 rounded-lg">
                                            {getIcon(doc.name)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-crm-navy">{doc.name}</div>
                                            <div className="text-xs text-gray-400">
                                                {new Date(doc.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs text-crm-slate">
                                        {doc.case_code && (
                                            <span className="block mb-1">
                                                <span className="font-semibold text-xs border px-1 rounded bg-gray-50 mr-1">CASO</span>
                                                {doc.case_code}
                                            </span>
                                        )}
                                        {doc.client_name && (
                                            <span className="block">
                                                <span className="font-semibold text-xs border px-1 rounded bg-gray-50 mr-1">CTE</span>
                                                {doc.client_name}
                                            </span>
                                        )}
                                        {!doc.case_code && !doc.client_name && <span className="text-gray-300 italic">Sin vincular</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {doc.file_type || 'Archivo'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => onDownload(doc.file_path)}
                                            className="p-1.5 text-gray-400 hover:text-crm-navy hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Descargar"
                                        >
                                            <Download size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(doc.id, doc.file_path)}
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

                {documents.length === 0 && (
                    <div className="p-12 text-center text-crm-slate">
                        <FileText size={48} className="mx-auto mb-4 text-gray-200" />
                        <p className="text-lg font-medium">No hay documentos</p>
                        <p className="text-sm">Sube expedientes, escritos o pruebas.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentList;
