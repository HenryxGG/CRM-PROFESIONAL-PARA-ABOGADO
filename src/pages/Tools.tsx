import React from 'react';
import Layout from '../components/Layout';
import Icon from '../components/common/Icon';

interface Tool {
    title: string;
    description: string;
    icon: string;
    link?: string;
    isComingSoon?: boolean;
}

const Tools: React.FC = () => {
    const tools: Tool[] = [
        {
            title: "Calculadora Legal",
            description: "Calcula términos, intereses y costas procesales rápidamente.",
            icon: "calculate",
            link: "#"
        },
        {
            title: "Firma Electrónica",
            description: "Enlace a servicios de firma electrónica oficial y validación.",
            icon: "draw",
            link: "https://www.icert.fje.gob.ec/formulario-pre-registro/"
        },
        {
            title: "Casilleros Judiciales",
            description: "Acceso al portal de Casilleros Judiciales Electrónicos.",
            icon: "forward_to_inbox",
            link: "https://cas.funcionjudicial.gob.ec/cas/login?TARGET=https%3A%2F%2Fsatje-externo.funcionjudicial.gob.ec%2FeSatje%2Fcasillero%2Fpages%2F"
        },
        {
            title: "Consulta de Causas",
            description: "Búsqueda en el sistema SATJE de la Función Judicial.",
            icon: "search",
            link: "https://procesosjudiciales.funcionjudicial.gob.ec/busqueda"
        },
        {
            title: "Pensiones Alimenticias",
            description: "Consulta del Sistema Único de Pensiones Alimenticias (SUPA).",
            icon: "payments",
            link: "https://www.funcionjudicial.gob.ec/supa/"
        },
        {
            title: "Peritos",
            description: "Consulta del registro oficial de peritos judiciales.",
            icon: "badge",
            link: "https://www.funcionjudicial.gob.ec/servicio-pericial/"
        },
        {
            title: "Jurisprudencia",
            description: "Visor de jurisprudencia de la Corte Nacional de Justicia.",
            icon: "gavel",
            link: "https://appsj.funcionjudicial.gob.ec/jurisprudencia/opcionBusqueda.jsf"
        },
        {
            title: "Guía de Servicios",
            description: "Portal oficial de servicios de la Función Judicial.",
            icon: "explore",
            link: "https://apps.funcionjudicial.gob.ec/siscadep/frmConsultaExterna/frmConsultaExterna.php"
        },
        {
            title: "Remates Judiciales",
            description: "Portal oficial de remates judiciales en línea.",
            icon: "sell",
            link: "https://remates.funcionjudicial.gob.ec/rematesjudiciales-web/pages/public/portal.jsf"
        },
        {
            title: "Generador de Minutas",
            description: "Próximamente: Plantillas automatizadas para documentos legales.",
            icon: "history_edu",
            isComingSoon: true
        },
        {
            title: "Reportes Avanzados",
            description: "Próximamente: Estadísticas detalladas de gestión del estudio.",
            icon: "analytics",
            isComingSoon: true
        }
    ];

    return (
        <Layout>
            <div className="flex-1 p-8 max-w-7xl mx-auto space-y-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                        <Icon name="handyman" size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Herramientas</h2>
                        <p className="text-slate-500 dark:text-slate-400">Accede a utilidades y configuraciones avanzadas del sistema.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <a
                            key={index}
                            href={tool.link || '#'}
                            target={tool.link && tool.link !== '#' ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className={`p-6 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 border-b-4 border-b-primary shadow-sm hover:shadow-md transition-all group flex flex-col h-full ${tool.isComingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'
                                }`}
                            onClick={(e) => {
                                if (tool.isComingSoon || tool.link === '#') e.preventDefault();
                            }}
                        >
                            <Icon name={tool.icon} className="text-primary mb-4" size={32} />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{tool.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow">{tool.description}</p>
                            {!tool.isComingSoon && tool.link !== '#' && (
                                <div className="mt-4 flex items-center text-xs font-semibold text-primary/70 group-hover:text-primary">
                                    IR AL SITIO
                                    <Icon name="open_in_new" size={14} className="ml-1" />
                                </div>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Tools;
