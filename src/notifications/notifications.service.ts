import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(tenantId: string, userId: string, query: any) {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 20, 100);
    const offset = (page - 1) * limit;

    const [{ count }] = await this.db
      .selectFrom('notifications')
      .select(this.db.fn.countAll().as('count'))
      .where('tenant_id', '=', tenantId)
      .where('user_id', '=', userId)
      .execute();

    const total = Number(count);

    const data = await this.db
      .selectFrom('notifications')
      .selectAll()
      .where('tenant_id', '=', tenantId)
      .where('user_id', '=', userId)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset)
      .execute();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(id: string, userId: string, tenantId: string) {
    const notification = await this.db
      .updateTable('notifications')
      .set({ read: true })
      .where('id', '=', id)
      .where('user_id', '=', userId)
      .where('tenant_id', '=', tenantId)
      .returningAll()
      .executeTakeFirst();

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async create(
    userId: string,
    type: string,
    message: string,
    tenantId: string,
    entityType?: string,
    entityId?: string,
  ) {
    return this.db
      .insertInto('notifications')
      .values({
        id: uuidv4(),
        user_id: userId,
        type,
        message,
        tenant_id: tenantId,
        entity_type: entityType || null,
        entity_id: entityId || null,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
