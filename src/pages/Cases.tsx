import { useState } from 'react';
import Layout from '../components/Layout';
import CaseList from '../components/CaseList';
import CaseForm from '../components/CaseForm';
import { useCases } from '../hooks/useCases';
import { Search, Loader2 } from 'lucide-react';
import Icon from '../components/common/Icon';
import type { Case } from '../types/case';

const Cases = () => {
    const { cases, loading, error, addCase, updateCase, deleteCase } = useCases();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCase, setEditingCase] = useState<Case | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreate = () => {
        setEditingCase(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (caseItem: Case) => {
        setEditingCase(caseItem);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este proceso? Se borrará todo el historial asociado.')) {
            await deleteCase(id);
        }
    };

    const handleSave = async (caseData: Omit<Case, 'id'> | Case) => {
        if ('id' in caseData) {
            await updateCase(caseData);
        } else {
            await addCase(caseData);
        }
    };

    const filteredCases = cases.filter(c =>
        (c.code?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (c.judicial_number?.includes(searchTerm) || false) ||
        (c.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    );

    return (
        <Layout>
            <div className="flex-1 overflow-y-auto hide-scrollbar bg-transparent">
                <div className="px-8 py-6 space-y-8 max-w-7xl mx-auto pb-12">
                    {/* Header alignment for SaaS look */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                        <div className="flex-1">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Procesos Judiciales</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Control de expedientes y causas activas.</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Search size={18} />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Buscar expediente..."
                                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleCreate}
                                className="flex items-center gap-2 bg-slate-900 dark:bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-lg font-bold text-sm"
                            >
                                <Icon name="add_task" size={20} />
                                <span className="hidden md:inline">Nuevo Proceso</span>
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center shadow-sm">
                            <Icon name="error" className="mr-2" />
                            <span className="font-medium mr-2">Error al cargar procesos:</span> {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 size={32} className="animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <CaseList
                                cases={filteredCases}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </div>
            </div>

            <CaseForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                initialData={editingCase}
            />
        </Layout>
    );
}

export default Cases;
