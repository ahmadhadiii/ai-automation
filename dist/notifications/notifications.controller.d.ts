import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(req: any): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        user_id: string;
        type: string;
        message: string;
        is_read: boolean;
    }[]>;
    markAsRead(id: string, req: any): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        user_id: string;
        type: string;
        message: string;
        is_read: boolean;
    }>;
}
