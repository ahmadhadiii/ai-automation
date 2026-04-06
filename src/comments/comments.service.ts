import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CommentsService {
  constructor(private readonly db: DatabaseService) {}

  async findByTask(taskId: string, tenantId: string) {
    return this.db
      .selectFrom('comments')
      .selectAll()
      .where('task_id', '=', taskId)
      .where('tenant_id', '=', tenantId)
      .orderBy('created_at', 'asc')
      .execute();
  }
}
