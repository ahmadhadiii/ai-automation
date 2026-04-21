import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DashboardService {
  constructor(private readonly db: DatabaseService) {}

  async getDashboard(tenantId: string) {
    const [projectsResult, tasksResult, todoResult, inProgressResult, completedResult] =
      await Promise.all([
        this.db
          .selectFrom('projects')
          .select(this.db.fn.countAll().as('count'))
          .where('tenant_id', '=', tenantId)
          .executeTakeFirstOrThrow(),
        this.db
          .selectFrom('tasks')
          .select(this.db.fn.countAll().as('count'))
          .where('tenant_id', '=', tenantId)
          .executeTakeFirstOrThrow(),
        this.db
          .selectFrom('tasks')
          .select(this.db.fn.countAll().as('count'))
          .where('tenant_id', '=', tenantId)
          .where('status', '=', 'ToDo')
          .executeTakeFirstOrThrow(),
        this.db
          .selectFrom('tasks')
          .select(this.db.fn.countAll().as('count'))
          .where('tenant_id', '=', tenantId)
          .where('status', '=', 'InProgress')
          .executeTakeFirstOrThrow(),
        this.db
          .selectFrom('tasks')
          .select(this.db.fn.countAll().as('count'))
          .where('tenant_id', '=', tenantId)
          .where('status', '=', 'Completed')
          .executeTakeFirstOrThrow(),
      ]);

    return {
      totalProjects: Number(projectsResult.count),
      totalTasks: Number(tasksResult.count),
      tasksByStatus: {
        ToDo: Number(todoResult.count),
        InProgress: Number(inProgressResult.count),
        Completed: Number(completedResult.count),
      },
    };
  }
}
