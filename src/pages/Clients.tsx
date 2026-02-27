import { useState } from 'react';
import Layout from '../components/Layout';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import { useClients } from '../hooks/useClients';
import { Search, Loader2 } from 'lucide-react';
import Icon from '../components/common/Icon';
import type { Client } from '../types/client';

const Clients = () => {
    const { clients, loading, error, addClient, updateClient, deleteClient } = useClients();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreate = () => {
        setEditingClient(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
            await deleteClient(id);
        }
    };

    const handleSave = async (clientData: Omit<Client, 'id'> | Client) => {
        if ('id' in clientData) {
            await updateClient(clientData);
        } else {
            await addClient(clientData);
        }
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.identification.includes(searchTerm)
    );

    return (
        <Layout>
            <div className="flex-1 overflow-y-auto hide-scrollbar bg-transparent">
                <div className="px-8 py-6 space-y-8 max-w-7xl mx-auto pb-12">
                    {/* Header alignment for SaaS look */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                        <div className="flex-1">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Gestión de Clientes</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Administra tu cartera de clientes naturales y jurídicos.</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Search size={18} />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Buscar cliente..."
                                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleCreate}
                                className="flex items-center gap-2 bg-slate-900 dark:bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-lg font-bold text-sm"
                            >
                                <Icon name="person_add" size={20} />
                                <span className="hidden md:inline">Nuevo Cliente</span>
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center shadow-sm">
                            <Icon name="error" className="mr-2" />
                            <span className="font-medium mr-2">Error:</span> {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 size={32} className="animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <ClientList
                                clients={filteredClients.length > 0 ? filteredClients : []}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </div>
            </div>

            <ClientForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                initialData={editingClient}
            />
        </Layout>
    );
}

export default Clients;
