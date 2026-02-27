export interface Document {
    id: string;
    name: string;
    file_path: string;
    file_type?: string;
    version: number;
    case_id?: string;
    case_code?: string; // joined
    client_id?: string;
    client_name?: string; // joined
    uploader_id?: string;
    created_at: string;
}
