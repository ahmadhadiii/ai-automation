import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuditService {
  constructor(private readonly db: DatabaseService) {}

  async log(
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    tenantId: string,
  ) {
    return this.db
      .insertInto('audit_logs')
      .values({
        id: uuidv4(),
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        tenant_id: tenantId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findByTenant(tenantId: string) {
    return this.db
      .selectFrom('audit_logs')
      .selectAll()
      .where('tenant_id', '=', tenantId)
      .orderBy('created_at', 'desc')
      .execute();
  }
}
