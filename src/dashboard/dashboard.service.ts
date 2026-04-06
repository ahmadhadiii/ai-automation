import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DashboardService {
  constructor(private readonly db: DatabaseService) {}

  async getSummary(tenantId: string) {
    const [projects, tasks, users] = await Promise.all([
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
        .selectFrom('users')
        .select(this.db.fn.countAll().as('count'))
        .where('tenant_id', '=', tenantId)
        .executeTakeFirstOrThrow(),
    ]);

    return {
      total_projects: Number(projects.count),
      total_tasks: Number(tasks.count),
      total_users: Number(users.count),
    };
  }
}
