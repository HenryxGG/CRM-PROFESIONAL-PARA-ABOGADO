export type EventType = 'audiencia' | 'reunion' | 'vencimiento' | 'tarea';
export type EventStatus = 'pendiente' | 'realizado' | 'cancelado';

export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    start_time: string;
    end_time?: string;
    type: EventType;
    status: EventStatus;
    case_id?: string;
    case_code?: string; // joined
    client_id?: string;
    client_name?: string; // joined
    lawyer_id?: string;
    location?: string;
    created_at?: string;
}
