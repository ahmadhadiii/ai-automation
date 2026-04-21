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
    organizationId: string,
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
        organization_id: organizationId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findAll(tenantId: string, query: any) {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 20, 100);
    const offset = (page - 1) * limit;

    const [{ count }] = await this.db
      .selectFrom('audit_logs')
      .select(this.db.fn.count('id').as('count'))
      .where('tenant_id', '=', tenantId)
      .execute();

    const data = await this.db
      .selectFrom('audit_logs')
      .selectAll()
      .where('tenant_id', '=', tenantId)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset)
      .execute();

    return {
      data,
      meta: {
        total: Number(count),
        page,
        limit,
        totalPages: Math.ceil(Number(count) / limit),
      },
    };
  }
}
