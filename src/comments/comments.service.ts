import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateCommentDto, userId: string, tenantId: string) {
    const task = await this.db
      .selectFrom('tasks')
      .selectAll()
      .where('id', '=', dto.task_id)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const id = uuidv4();
    return this.db
      .insertInto('comments')
      .values({
        id,
        task_id: dto.task_id,
        user_id: userId,
        content: dto.content,
        tenant_id: tenantId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findByTask(taskId: string, tenantId: string) {
    return this.db
      .selectFrom('comments')
      .selectAll()
      .where('task_id', '=', taskId)
      .where('tenant_id', '=', tenantId)
      .orderBy('created_at', 'asc')
      .execute();
  }

  async findOne(id: string, tenantId: string) {
    const comment = await this.db
      .selectFrom('comments')
      .selectAll()
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async remove(id: string, userId: string, tenantId: string) {
    const comment = await this.db
      .selectFrom('comments')
      .selectAll()
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user_id !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.db
      .deleteFrom('comments')
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .execute();

    return { deleted: true };
  }
}
