import React from 'react';
import Layout from '../components/Layout';
import KPICard from '../components/KPICard';
import HearingCard from '../components/HearingCard';
import Icon from '../components/common/Icon';
import { KPIS, DEADLINES, HEARINGS, RECENT_DOCUMENTS, QUICK_LINKS } from '../constants/dashboard';

const Dashboard: React.FC = () => {
    const insight = "Detecté 2 plazos civiles que vencen mañana. Recomiendo priorizar la contestación del expediente 17231.";

    return (
        <Layout>
            <div className="flex-1 overflow-y-auto hide-scrollbar bg-transparent">
                {/* Fixed Header alignment for SaaS look - 24px/32px padding */}
                <div className="px-8 py-6 space-y-8 max-w-7xl mx-auto pb-12">

                    {/* Welcome & AI Insight - Header Wrapper */}
                    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-transparent">
                        <div className="flex-1">
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Bienvenido, Dr. Moreno</h2>
                            <div className="mt-2 flex items-center gap-2">
                                <Icon name="smart_toy" className="text-primary" size={20} />
                                <p className="text-slate-500 dark:text-slate-400 italic text-sm">
                                    {insight}
                                </p>
                            </div>
                        </div>
                        {/* Action Buttons Wrapper - 16px/24px conceptually within the header area */}
                        <div className="flex items-center gap-3 shrink-0">
                            <button className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:opacity-90 transition-all">
                                <Icon name="file_upload" size={18} />
                                Importar Expediente
                            </button>
                        </div>
                    </section>

                    {/* KPI Section */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {KPIS.map((kpi, idx) => (
                            <KPICard key={idx} data={kpi} />
                        ))}
                    </section>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Left Column: Deadlines */}
                        <div className="xl:col-span-2 space-y-6">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                                    <Icon name="priority_high" className="text-rose-500" />
                                    Alertas de Plazos Próximos a Vencer
                                </h3>
                                <button className="text-sm text-primary font-bold hover:underline">Ver todo</button>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                                            <tr>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">Expediente</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">Descripción de Plazo</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">Vencimiento</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">Prioridad</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {DEADLINES.map((deadline) => (
                                                <tr key={deadline.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-primary group-hover:underline cursor-pointer">{deadline.expediente}</p>
                                                        <p className="text-xs text-slate-400 italic">{deadline.tipo}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">{deadline.descripcion}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{deadline.vencimiento}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${deadline.prioridad === 'URGENTE'
                                                            ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                                            : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                                            }`}>
                                                            {deadline.prioridadLabel}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Hearings */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                                    <Icon name="event" className="text-primary" />
                                    Próximas Audiencias
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {HEARINGS.map((hearing) => (
                                    <HearingCard key={hearing.id} hearing={hearing} />
                                ))}
                                <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-sm font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                                    + Agendar Nueva Audiencia
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Documents & Quick Links */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4 px-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Documentos Recientes</h3>
                            <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm">
                                {RECENT_DOCUMENTS.map((doc) => (
                                    <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <Icon
                                                name={doc.tipo === 'pdf' ? 'picture_as_pdf' : 'description'}
                                                className={doc.tipo === 'pdf' ? 'text-rose-500' : 'text-blue-500'}
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{doc.nombre}</p>
                                                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-tighter">Subido hace {doc.subidoHace} • {doc.tamano}</p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                            <Icon name="download" size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 px-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Accesos Rápidos</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-4">
                                {QUICK_LINKS.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        className="p-6 bg-white dark:bg-slate-900/40 rounded-xl flex flex-col items-center justify-center gap-3 border border-slate-200 dark:border-slate-800 hover:border-primary hover:shadow-lg transition-all group group-hover:-translate-y-1"
                                    >
                                        <Icon name={link.icon} className="text-primary group-hover:scale-110 transition-transform" size={32} />
                                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
