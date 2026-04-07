import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(req: any): Promise<{
        total_projects: number;
        total_tasks: number;
        total_users: number;
    }>;
}
