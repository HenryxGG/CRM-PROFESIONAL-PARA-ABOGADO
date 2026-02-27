import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import DocumentList from '../components/DocumentList';
import { useDocuments } from '../hooks/useDocuments';
import { useCases } from '../hooks/useCases';
import { useClients } from '../hooks/useClients';
import { Loader2 } from 'lucide-react';
import Icon from '../components/common/Icon';

const Documents = () => {
    const { documents, loading, error, uploadDocument, deleteDocument, getDownloadUrl } = useDocuments();
    const { cases } = useCases();
    const { clients } = useClients();

    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedCaseId, setSelectedCaseId] = useState('');
    const [selectedClientId, setSelectedClientId] = useState('');

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setIsUploading(true);
            setUploadError('');
            try {
                let type = 'otro';
                if (file.type.includes('pdf')) type = 'legal';

                await uploadDocument(file, selectedCaseId, selectedClientId, type);
                if (fileInputRef.current) fileInputRef.current.value = '';
            } catch (err: any) {
                setUploadError(err.message || 'Error al subir archivo');
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleDelete = async (id: string, path: string) => {
        if (window.confirm('¿Eliminar este documento permanentemente?')) {
            await deleteDocument(id, path);
        }
    };

    const handleDownload = async (path: string) => {
        const url = await getDownloadUrl(path);
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('No se pudo generar el enlace de descarga');
        }
    };

    return (
        <Layout>
            <div className="flex-1 overflow-y-auto hide-scrollbar bg-transparent">
                <div className="px-8 py-6 space-y-8 max-w-7xl mx-auto pb-12">
                    {/* Header alignment for SaaS look */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                        <div className="flex-1">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Gestión Documental</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Repositorio digital de expedientes y escritos.</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 bg-white dark:bg-slate-900/50 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-gray-500 dark:text-slate-500 hidden lg:inline font-bold uppercase tracking-wider">Vincular a:</span>
                                <select
                                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 max-w-[130px] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary text-xs transition-all"
                                    value={selectedCaseId}
                                    onChange={(e) => { setSelectedCaseId(e.target.value); if (e.target.value) setSelectedClientId(''); }}
                                >
                                    <option value="">(Caso...)</option>
                                    {cases.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
                                </select>
                                <select
                                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 max-w-[130px] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary text-xs transition-all"
                                    value={selectedClientId}
                                    onChange={(e) => { setSelectedClientId(e.target.value); if (e.target.value) setSelectedCaseId(''); }}
                                >
                                    <option value="">(Cliente...)</option>
                                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 bg-slate-900 dark:bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all shadow-md disabled:opacity-50 font-bold text-sm"
                                disabled={isUploading}
                            >
                                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Icon name="cloud_upload" size={20} />}
                                <span className="hidden md:inline">Subir</span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                        </div>
                    </div>

                    {(error || uploadError) && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center shadow-sm">
                            <Icon name="error" className="mr-2" />
                            {uploadError || error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 size={32} className="animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-sm">
                            <DocumentList
                                documents={documents}
                                onDelete={handleDelete}
                                onDownload={handleDownload}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Documents;
