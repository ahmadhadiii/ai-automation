import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(dto: CreateCommentDto, req: any): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        task_id: string;
        content: string;
        user_id: string;
    }>;
    findByTask(taskId: string, req: any): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        task_id: string;
        content: string;
        user_id: string;
    }[]>;
    findOne(id: string, req: any): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        task_id: string;
        content: string;
        user_id: string;
    }>;
    remove(id: string, req: any): Promise<{
        deleted: boolean;
    }>;
}
