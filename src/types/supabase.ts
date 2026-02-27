export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    role: 'admin' | 'abogado' | 'asistente'
                    avatar_url: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    role?: 'admin' | 'abogado' | 'asistente'
                    avatar_url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    role?: 'admin' | 'abogado' | 'asistente'
                    avatar_url?: string | null
                    created_at?: string
                }
            }
            clients: {
                Row: {
                    id: string
                    type: 'natural' | 'juridica'
                    identification: string
                    name: string
                    email: string | null
                    phone: string | null
                    address: string | null
                    status: 'prospecto' | 'activo' | 'inactivo'
                    created_at: string
                }
                Insert: {
                    id?: string
                    type: 'natural' | 'juridica'
                    identification: string
                    name: string
                    email?: string | null
                    phone?: string | null
                    address?: string | null
                    status?: 'prospecto' | 'activo' | 'inactivo'
                    created_at?: string
                }
                Update: {
                    id?: string
                    type?: 'natural' | 'juridica'
                    identification?: string
                    name?: string
                    email?: string | null
                    phone?: string | null
                    address?: string | null
                    status?: 'prospecto' | 'activo' | 'inactivo'
                    created_at?: string
                }
            }
            cases: {
                Row: {
                    id: string
                    code: string | null
                    judicial_number: string | null
                    type: string
                    status: string
                    client_id: string
                    responsible_lawyer_id: string | null
                    judicial_unit: string | null
                    city: string | null
                    province: string | null
                    opposing_party: string | null
                    description: string | null
                    amount: number | null
                    start_date: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    code?: string | null
                    judicial_number?: string | null
                    type: string
                    status?: string
                    client_id: string
                    responsible_lawyer_id?: string | null
                    judicial_unit?: string | null
                    city?: string | null
                    province?: string | null
                    opposing_party?: string | null
                    description?: string | null
                    amount?: number | null
                    start_date?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    code?: string | null
                    judicial_number?: string | null
                    type?: string
                    status?: string
                    client_id?: string
                    responsible_lawyer_id?: string | null
                    judicial_unit?: string | null
                    city?: string | null
                    province?: string | null
                    opposing_party?: string | null
                    description?: string | null
                    amount?: number | null
                    start_date?: string | null
                    created_at?: string
                }
            }
            events: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    start_time: string
                    end_time: string | null
                    type: 'audiencia' | 'reunion' | 'vencimiento' | 'tarea'
                    case_id: string | null
                    client_id: string | null
                    lawyer_id: string | null
                    location: string | null
                    status: 'pendiente' | 'realizado' | 'cancelado'
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    start_time: string
                    end_time?: string | null
                    type: 'audiencia' | 'reunion' | 'vencimiento' | 'tarea'
                    case_id?: string | null
                    client_id?: string | null
                    lawyer_id?: string | null
                    location?: string | null
                    status?: 'pendiente' | 'realizado' | 'cancelado'
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    start_time?: string
                    end_time?: string | null
                    type?: 'audiencia' | 'reunion' | 'vencimiento' | 'tarea'
                    case_id?: string | null
                    client_id?: string | null
                    lawyer_id?: string | null
                    location?: string | null
                    status?: 'pendiente' | 'realizado' | 'cancelado'
                    created_at?: string
                }
            }
            documents: {
                Row: {
                    id: string
                    case_id: string | null
                    client_id: string | null
                    uploader_id: string | null
                    name: string
                    file_path: string
                    file_type: string | null
                    version: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    case_id?: string | null
                    client_id?: string | null
                    uploader_id?: string | null
                    name: string
                    file_path: string
                    file_type?: string | null
                    version?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    case_id?: string | null
                    client_id?: string | null
                    uploader_id?: string | null
                    name?: string
                    file_path?: string
                    file_type?: string | null
                    version?: number
                    created_at?: string
                }
            }
        }
    }
}
