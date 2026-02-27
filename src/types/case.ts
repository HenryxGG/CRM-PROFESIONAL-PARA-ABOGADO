export type CaseType =
    | 'civil' | 'penal' | 'laboral' | 'familia' | 'transito'
    | 'contencioso_admin' | 'contencioso_tributario' | 'constitucional'
    | 'inquilinato' | 'mediacion' | 'administrativo';

export type CaseStatus = 'iniciado' | 'en_tramite' | 'suspendido' | 'archivado' | 'finalizado';

export interface Case {
    id: string;
    code?: string;
    judicial_number?: string;
    type: CaseType;
    status: CaseStatus;
    client_id: string;
    client_name?: string; // For UI display (joined)
    responsible_lawyer_id?: string;
    judicial_unit?: string;
    city?: string;
    province?: string;
    opposing_party?: string;
    description?: string;
    amount?: number;
    start_date?: string;
    created_at?: string;
}
