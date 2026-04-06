export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
    project_id: string;
    assignee_id?: string;
    due_date?: string;
}
