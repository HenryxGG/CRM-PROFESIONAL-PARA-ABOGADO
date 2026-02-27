export type ClientType = 'natural' | 'juridica';
export type ClientStatus = 'prospecto' | 'activo' | 'inactivo';

export interface Client {
    id: string;
    type: ClientType;
    identification: string;
    name: string;
    email: string; // Made required for UI simplicity
    phone?: string;
    address?: string;
    status: ClientStatus;
    proceedings_count?: number; // Virtual field for UI
}
