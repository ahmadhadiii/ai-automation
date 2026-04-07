import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly db: DatabaseService) {}

  async findByUser(userId: string, tenantId: string) {
    return this.db
      .selectFrom('notifications')
      .selectAll()
      .where('user_id', '=', userId)
      .where('tenant_id', '=', tenantId)
      .orderBy('created_at', 'desc')
      .execute();
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
