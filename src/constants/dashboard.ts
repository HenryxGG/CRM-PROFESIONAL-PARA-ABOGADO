
import type { KPIData, Deadline, Hearing, RecentDocument, QuickLink } from '../types/dashboard';

export const KPIS: KPIData[] = [
    {
        label: 'Total Procesos',
        value: '124',
        icon: 'folder',
        change: '+5.2% este mes',
        changeType: 'up',
        colorClass: 'text-primary'
    },
    {
        label: 'Ingresos del Mes',
        value: '$4,250.00',
        icon: 'payments',
        change: '-2.1% vs prev.',
        changeType: 'down',
        colorClass: 'text-emerald-500'
    },
    {
        label: 'Audiencias Hoy',
        value: '3',
        icon: 'event_available',
        info: 'Próxima a las 11:30 AM',
        colorClass: 'text-amber-500'
    },
    {
        label: 'Alertas Críticas',
        value: '8',
        icon: 'error',
        info: 'Acción requerida hoy',
        changeType: 'down',
        colorClass: 'text-rose-600'
    }
];

export const DEADLINES: Deadline[] = [
    {
        id: '1',
        expediente: '17231-2023-0045',
        tipo: 'Civil - Ordinario',
        descripcion: 'Contestación de Demanda',
        vencimiento: 'Hoy, 17:00',
        prioridad: 'URGENTE',
        prioridadLabel: 'URGENTE (Hoy)'
    },
    {
        id: '2',
        expediente: '09281-2024-0122',
        tipo: 'Laboral - Despido',
        descripcion: 'Presentación de Pruebas',
        vencimiento: '26 May 2024',
        prioridad: 'PRÓXIMO',
        prioridadLabel: 'PRÓXIMO (48h)'
    },
    {
        id: '3',
        expediente: '17902-2022-0931',
        tipo: 'Familia - Alimentos',
        descripcion: 'Recurso de Apelación',
        vencimiento: '26 May 2024',
        prioridad: 'PRÓXIMO',
        prioridadLabel: 'PRÓXIMO (48h)'
    }
];

export const HEARINGS: Hearing[] = [
    {
        id: 'h1',
        fecha: 'Hoy',
        hora: '11:30 AM',
        sala: 'SALA 204',
        titulo: 'Audiencia de Juicio - Ordinario',
        unidadJudicial: 'Unidad Judicial Civil de la Parroquia Iñaquito',
        juez: 'Dr. Ricardo Vallejo',
        juezCargo: 'Juez Ponente',
        juezAvatar: 'https://i.pravatar.cc/150?u=juez1',
        tipo: 'presencial',
        isToday: true
    },
    {
        id: 'h2',
        fecha: 'Mañana',
        hora: '09:00 AM',
        sala: 'SALA 12',
        titulo: 'Audiencia Preparatoria',
        unidadJudicial: 'Unidad Judicial de Trabajo de Guayaquil',
        juez: 'Dra. Martha Espinoza',
        juezCargo: 'Jueza Laboral',
        juezAvatar: 'https://i.pravatar.cc/150?u=juez2',
        tipo: 'virtual',
        isToday: false
    }
];

export const RECENT_DOCUMENTS: RecentDocument[] = [
    {
        id: 'd1',
        nombre: 'Demanda_Civil_Ordinario.pdf',
        subidoHace: '2h',
        tamano: '1.2 MB',
        tipo: 'pdf'
    },
    {
        id: 'd2',
        nombre: 'Anexo_Pruebas_Testimoniales.docx',
        subidoHace: '5h',
        tamano: '840 KB',
        tipo: 'doc'
    }
];

export const QUICK_LINKS: QuickLink[] = [
    { id: 'ql1', label: 'Consulta SUPA', icon: 'balance', url: '#' },
    { id: 'ql2', label: 'Satje Judicial', icon: 'public', url: '#' },
    { id: 'ql3', label: 'Casillero Judicial', icon: 'article', url: '#' },
    { id: 'ql4', label: 'Calc. Intereses', icon: 'calculate', url: '#' }
];
