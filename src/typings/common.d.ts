export interface BaseProps {
    id: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at?: string | null;
}