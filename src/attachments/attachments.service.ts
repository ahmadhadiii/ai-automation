import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AttachmentsService {
  constructor(private readonly db: DatabaseService) {}

  async findByTask(taskId: string, tenantId: string) {
    return this.db
      .selectFrom('attachments')
      .selectAll()
      .where('task_id', '=', taskId)
      .where('tenant_id', '=', tenantId)
      .orderBy('uploaded_at', 'desc')
      .execute();
  }
}
