import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCases } from '../hooks/useCases';
import { useEvents } from '../hooks/useEvents';
import { useDocuments } from '../hooks/useDocuments';
import CalendarView from '../components/CalendarView';
import DocumentList from '../components/DocumentList';
import EventForm from '../components/EventForm';
import { Loader2, ArrowLeft, Scale, AlertCircle } from 'lucide-react';
import type { CalendarEvent } from '../types/event';

const CaseDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { cases, loading: casesLoading } = useCases();
    const { events, loading: eventsLoading, addEvent, updateEvent, deleteEvent } = useEvents();
    const { documents, loading: docsLoading, deleteDocument, getDownloadUrl } = useDocuments();

    // Local state
    const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'documents'>('overview');
    const [isEventFormOpen, setIsEventFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>(undefined);

    // Find the case
    const currentCase = cases.find(c => c.id === id);

    // Filter related items
    const caseEvents = events.filter(e => e.case_id === id);
    const caseDocuments = documents.filter(d => d.case_id === id);


    const handleEventSave = async (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
        // Ensure case_id is set
        const dataWithCase = { ...eventData, case_id: id };

        if ('id' in dataWithCase) {
            await updateEvent(dataWithCase as CalendarEvent);
        } else {
            await addEvent(dataWithCase);
        }
    };

    const handleEventDelete = async (eventId: string) => {
        await deleteEvent(eventId);
        setIsEventFormOpen(false);
    };

    const handleDocDelete = async (docId: string, path: string) => {
        if (window.confirm('¿Eliminar documento?')) {
            await deleteDocument(docId, path);
        }
    };

    const handleDocDownload = async (path: string) => {
        const url = await getDownloadUrl(path);
        if (url) window.open(url, '_blank');
    };

    if (casesLoading) {
        return (
            <Layout>
                <div className="flex justify-center p-12">
                    <Loader2 size={32} className="animate-spin text-crm-navy" />
                </div>
            </Layout>
        );
    }

    if (!currentCase) {
        return (
            <Layout>
                <div className="text-center p-12">
                    <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-gray-800">Caso no encontrado</h2>
                    <Link to="/cases" className="text-crm-navy hover:underline mt-2 inline-block">Volver a lista de procesos</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-6">
                <Link to="/cases" className="inline-flex items-center text-sm text-gray-500 hover:text-crm-navy dark:text-slate-400 dark:hover:text-white mb-4 transition-colors">
                    <ArrowLeft size={16} className="mr-1" />
                    Volver a Procesos
                </Link>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-crm-navy dark:text-white">{currentCase.code || 'Sin Código'}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border 
                                ${currentCase.status === 'iniciado' ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900' :
                                    currentCase.status === 'finalizado' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900' :
                                        'bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'}`}>
                                {currentCase.status.replace('_', ' ')}
                            </span>
                        </div>
                        <p className="text-lg text-gray-700 dark:text-slate-300 font-medium">{currentCase.client_name}</p>
                        <p className="text-sm text-crm-slate dark:text-slate-500">Vs. {currentCase.opposing_party || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-slate-800 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'overview'
                            ? 'border-crm-gold text-crm-gold'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 hover:border-gray-300 dark:hover:border-slate-600'
                            }`}
                    >
                        Resumen
                    </button>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'events'
                            ? 'border-crm-gold text-crm-gold'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 hover:border-gray-300 dark:hover:border-slate-600'
                            }`}
                    >
                        Agenda ({caseEvents.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('documents')}
                        className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'documents'
                            ? 'border-crm-gold text-crm-gold'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 hover:border-gray-300 dark:hover:border-slate-600'
                            }`}
                    >
                        Documentos ({caseDocuments.length})
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                                <h3 className="text-lg font-bold text-crm-navy dark:text-white mb-4 flex items-center">
                                    <Scale size={20} className="mr-2" />
                                    Detalles del Proceso
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                    <div>
                                        <span className="block text-gray-400 mb-1">Tipo de Proceso</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">{currentCase.type}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400 mb-1">Nro. Judicial (SATJE)</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{currentCase.judicial_number || 'No registrado'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400 mb-1">Unidad Judicial</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{currentCase.judicial_unit || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400 mb-1">Ciudad / Provincia</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{currentCase.city ? `${currentCase.city}, ${currentCase.province}` : '-'}</span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="block text-gray-400 mb-1">Descripción / Pretensión</span>
                                        <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-800 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
                                            {currentCase.description || 'Sin descripción detallada.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Próximos Eventos</h3>
                                {caseEvents.length > 0 ? (
                                    <div className="space-y-3">
                                        {caseEvents.slice(0, 3).map(e => (
                                            <div key={e.id} className="text-sm border-l-2 border-crm-gold pl-3 py-1">
                                                <div className="font-medium text-crm-navy dark:text-white">{e.title}</div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(e.start_time).toLocaleDateString()} - {new Date(e.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => setActiveTab('events')} className="text-xs text-crm-gold hover:underline mt-2">Ver todos</button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">No hay eventos próximos.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-crm-navy">Agenda del Caso</h3>
                            <button
                                onClick={() => { setEditingEvent(undefined); setIsEventFormOpen(true); }}
                                className="text-sm bg-crm-navy text-white px-3 py-1.5 rounded-lg hover:bg-opacity-90"
                            >
                                + Agregar Evento
                            </button>
                        </div>
                        {eventsLoading ? <Loader2 className="animate-spin mx-auto" /> : (
                            <CalendarView
                                events={caseEvents}
                                onEventClick={(e) => { setEditingEvent(e); setIsEventFormOpen(true); }}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-crm-navy">Expediente Digital</h3>
                            {/* Upload logic would go here or link to main documents page with context */}
                            <Link to="/documents" className="text-sm bg-crm-navy text-white px-3 py-1.5 rounded-lg hover:bg-opacity-90">
                                Ir a Gestión Documental
                            </Link>
                        </div>
                        {docsLoading ? <Loader2 className="animate-spin mx-auto" /> : (
                            <DocumentList
                                documents={caseDocuments}
                                onDelete={handleDocDelete}
                                onDownload={handleDocDownload}
                            />
                        )}
                    </div>
                )}
            </div>

            <EventForm
                isOpen={isEventFormOpen}
                onClose={() => setIsEventFormOpen(false)}
                onSave={handleEventSave}
                onDelete={handleEventDelete}
                initialData={editingEvent}
            />
        </Layout>
    );
};

export default CaseDetails;
