export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: 'ToDo' | 'InProgress' | 'Completed';
    project_id: string;
    assignee_id?: string;
    due_date?: string;
}
