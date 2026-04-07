export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: 'ToDo' | 'InProgress' | 'Completed';
    assignee_id?: string;
    due_date?: string;
}
