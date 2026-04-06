import { DatabaseService } from '../database/database.service';
export declare class DashboardService {
    private readonly db;
    constructor(db: DatabaseService);
    getSummary(tenantId: string): Promise<{
        total_projects: number;
        total_tasks: number;
        total_users: number;
    }>;
}
