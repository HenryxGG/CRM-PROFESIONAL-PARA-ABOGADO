
export interface KPIData {
    label: string;
    value: string;
    icon: string;
    change?: string;
    changeType?: 'up' | 'down';
    colorClass: string;
    info?: string;
}

export interface Deadline {
    id: string;
    expediente: string;
    tipo: string;
    descripcion: string;
    vencimiento: string;
    prioridad: 'URGENTE' | 'PRÓXIMO' | 'NORMAL';
    prioridadLabel: string;
}

export interface Hearing {
    id: string;
    fecha: string;
    hora: string;
    sala: string;
    titulo: string;
    unidadJudicial: string;
    juez: string;
    juezCargo: string;
    juezAvatar: string;
    tipo: 'presencial' | 'virtual';
    isToday: boolean;
}

export interface RecentDocument {
    id: string;
    nombre: string;
    subidoHace: string;
    tamano: string;
    tipo: 'pdf' | 'doc';
}

export interface QuickLink {
    id: string;
    label: string;
    icon: string;
    url: string;
}
