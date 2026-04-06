export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
    assignee_id?: string;
    due_date?: string;
}
