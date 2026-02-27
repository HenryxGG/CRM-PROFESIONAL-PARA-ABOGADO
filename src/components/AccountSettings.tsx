import React, { useState } from 'react';
import Icon from './common/Icon';
import type { Role } from '../types/settings';

// Mocked Hook for auth context (In a real app, this comes from a context or Redux)
const useAuth = () => {
    // Toggle this to test different roles: 'ADMIN_ROLE' | 'USER_ROLE'
    return { role: 'ADMIN_ROLE' as Role, user: { name: 'Dr. Moreno' } };
};

// --- Sub-components for Tabs ---

const AdminSystemSettings = ({ onRequiresSecurityConfirm }: { onRequiresSecurityConfirm: (action: string) => void }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-[#1A232E] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icon name="admin_panel_settings" className="text-primary" />
                    Control de Acceso (ACL)
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Gestiona qué usuarios tienen permisos de lectura, escritura o exportación sobre los datos de esta cuenta.
                </p>
                <button
                    onClick={() => onRequiresSecurityConfirm('MODIFICAR_ACL')}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                    Configurar Permisos
                </button>
            </div>

            <div className="bg-white dark:bg-[#1A232E] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icon name="payments" className="text-emerald-500" />
                    Esquemas de Facturación
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Define reglas sobre tarifas por hora, cuota litis, e impuestos aplicables.
                </p>
                <button
                    onClick={() => onRequiresSecurityConfirm('MODIFICAR_FACTURACION')}
                    className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-lg text-sm font-medium transition-colors border border-emerald-200 dark:border-emerald-800/50">
                    Modificar Facturación
                </button>
            </div>

            <div className="bg-rose-50 dark:bg-rose-900/10 rounded-xl p-6 border border-rose-200 dark:border-rose-800/50 shadow-sm">
                <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 mb-4 flex items-center gap-2">
                    <Icon name="warning" />
                    Zona de Peligro (Retención de Datos)
                </h3>
                <p className="text-sm text-rose-600/80 dark:text-rose-400/80 mb-4">
                    Configura políticas de borrado de datos (Soft Delete vs Hard Delete). Estas acciones son irreversibles tras el periodo de gracia.
                </p>
                <button
                    onClick={() => onRequiresSecurityConfirm('ELIMINAR_DATOS')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-bold shadow-md shadow-rose-600/20 transition-all flex items-center gap-2">
                    <Icon name="delete_forever" size={18} />
                    Purgar Datos de Cuenta
                </button>
            </div>
        </div>
    );
};

const UserPersonalPreferences = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-[#1A232E] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icon name="notifications_active" className="text-blue-500" />
                    Matriz de Notificaciones
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Controla cómo y cuándo recibes alertas sobre hitos procesales (Ej. Audiencias, Vencimientos).
                </p>
                <div className="space-y-3">
                    {['Audiencia Fijada', 'Escrito Presentado', 'Término a Vencer'].map(evento => (
                        <div key={evento} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{evento}</span>
                            <div className="flex gap-2">
                                <label className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" defaultChecked /> Email
                                </label>
                                <label className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" defaultChecked /> In-App
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-[#1A232E] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icon name="sync" className="text-purple-500" />
                    Sincronización Externa
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Conecta tu calendario del CRM con tu Google Calendar personal.
                </p>
                <button className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Icon name="calendar_month" size={18} />
                    Conectar Calendario
                </button>
            </div>
        </div>
    );
};

// --- Modal Component ---

const SecurityConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    action
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    action: string;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
        } finally {
            setIsLoading(false);
            setPassword('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-[#1A232E] rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-slide-up">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mx-auto mb-4">
                    <Icon name="lock" size={24} />
                </div>
                <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Re-autenticación Requerida</h2>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Estás a punto de realizar una acción crítica de administrador ({action}). Por seguridad, por favor ingresa tu contraseña.
                </p>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors disabled:opacity-50">
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isLoading || !password}
                        className="flex-1 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all flex justify-center items-center disabled:opacity-50">
                        {isLoading ? (
                            <Icon name="progress_activity" className="animate-spin" size={20} />
                        ) : 'Confirmar Acción'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

const AccountSettings: React.FC = () => {
    const { role } = useAuth();

    // Tab State: If admin, default to 'system'. If user, default to 'personal' (and only allow personal)
    const [activeTab, setActiveTab] = useState<'SYSTEM' | 'PERSONAL'>(role === 'ADMIN_ROLE' ? 'SYSTEM' : 'PERSONAL');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState('');

    // Toast State
    const [toastMessage, setToastMessage] = useState<{ title: string, message: string } | null>(null);

    const handleRequireSecurity = (action: string) => {
        setPendingAction(action);
        setIsModalOpen(true);
    };

    const executeAction = async () => {
        console.log(`Iniciando petición API para: ${pendingAction}`);

        // Simular petición HTTP con fetch/axios
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log(`Acción completada con éxito: ${pendingAction}`);

        // Mostrar feedback al usuario
        setToastMessage({
            title: 'Acción Completada',
            message: `La operación "${pendingAction}" se ha guardado correctamente.`
        });

        // Ocultar el toast después de 3 segundos
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 relative">

            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Ajustes de Cuenta</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Gestiona la configuración y preferencias de seguridad del módulo de abogado.
                </p>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-800 mb-6 flex gap-8">
                {role === 'ADMIN_ROLE' && (
                    <button
                        onClick={() => setActiveTab('SYSTEM')}
                        className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${activeTab === 'SYSTEM'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        <Icon name="admin_panel_settings" size={18} />
                        Ajustes de Sistema
                    </button>
                )}

                <button
                    onClick={() => setActiveTab('PERSONAL')}
                    className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${activeTab === 'PERSONAL'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                >
                    <Icon name="tune" size={18} />
                    Preferencias Personales
                </button>
            </div>

            {/* Render Tab Content Conditionally */}
            <div className="min-h-[400px]">
                {activeTab === 'SYSTEM' && role === 'ADMIN_ROLE' && (
                    <AdminSystemSettings onRequiresSecurityConfirm={handleRequireSecurity} />
                )}

                {activeTab === 'PERSONAL' && (
                    <UserPersonalPreferences />
                )}
            </div>

            {/* Re-auth Modal */}
            <SecurityConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={executeAction}
                action={pendingAction}
            />

            {/* Success Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 shadow-xl z-[300] flex gap-3 items-start animate-slide-up">
                    <div className="bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-full shrink-0">
                        <Icon name="check_circle" size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">{toastMessage.title}</h4>
                        <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-0.5">{toastMessage.message}</p>
                    </div>
                    <button
                        onClick={() => setToastMessage(null)}
                        className="text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors ml-4"
                    >
                        <Icon name="close" size={18} />
                    </button>
                </div>
            )}

        </div>
    );
};

export default AccountSettings;
