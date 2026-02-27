import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './common/Icon';

const Sidebar: React.FC<{
    isCollapsed: boolean;
    isMobileSidebarOpen: boolean;
    setIsMobileSidebarOpen: (open: boolean) => void
}> = ({
    isCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
}) => {
        const navigate = useNavigate();
        const location = useLocation();

        const menuItems = [
            { label: 'Inicio', icon: 'dashboard', path: '/' },
            { label: 'Clientes', icon: 'group', path: '/clients' },
            { label: 'Procesos', icon: 'folder_open', path: '/cases' },
            { label: 'Agenda', icon: 'calendar_month', path: '/agenda' },
            { label: 'Documentos', icon: 'description', path: '/documents' },
            { label: 'Herramientas', icon: 'handyman', path: '/tools' },
            { label: 'Ajustes', icon: 'settings', path: '/settings' },
        ];

        return (
            <aside
                className={`fixed inset-y-0 left-0 z-[110] bg-[#111418] border-r border-slate-800 transition-all duration-300 ease-in-out md:translate-x-0 flex flex-col overflow-hidden ${isMobileSidebarOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full md:translate-x-0'
                    } ${isCollapsed ? 'md:w-[72px]' : 'md:w-[260px]'}`}
            >
                {/* Logo Section */}
                <div className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'p-4 justify-center' : 'p-6'}`}>
                    <div className="bg-primary p-2 rounded-lg shrink-0">
                        <Icon name="gavel" className="text-white" />
                    </div>
                    {(!isCollapsed || isMobileSidebarOpen) && (
                        <div className="overflow-hidden">
                            <h1 className="text-white text-lg font-bold leading-tight truncate">Gestión Legal</h1>
                            <p className="text-slate-500 text-xs font-normal truncate uppercase tracking-widest font-black opacity-60">Estudio Jurídico</p>
                        </div>
                    )}
                </div>

                <nav className={`flex-1 mt-2 space-y-1 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setIsMobileSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 py-2.5 rounded-lg transition-all group ${location.pathname === item.path
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                } ${isCollapsed ? 'px-0 justify-center' : 'px-3'}`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <Icon name={item.icon} className="shrink-0" />
                            {(!isCollapsed || isMobileSidebarOpen) && (
                                <span className="font-medium text-sm truncate">{item.label}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className={`mt-auto border-t border-slate-800 space-y-4 transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-4'}`}>
                    <button className={`w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/10 tracking-widest uppercase ${isCollapsed ? 'h-10 w-10 mx-auto p-0' : 'py-2.5'
                        }`}>
                        <Icon name="add_circle" size={18} />
                        {(!isCollapsed || isMobileSidebarOpen) && <span>Nuevo Proceso</span>}
                    </button>

                    <div className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'px-0 justify-center' : 'px-2 py-2'}`}>
                        <div className="size-10 rounded-full border border-slate-700 overflow-hidden shrink-0">
                            <img src="https://picsum.photos/seed/moreno/200/200" alt="Dr. Moreno" className="size-full object-cover" />
                        </div>
                        {(!isCollapsed || isMobileSidebarOpen) && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">Dr. Santiago Moreno</p>
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest truncate">Socio Principal</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        );
    };

export default Sidebar;
