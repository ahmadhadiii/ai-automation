import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly db: DatabaseService) {}

  async create(taskId: string, userId: string, tenantId: string, dto: CreateCommentDto) {
    const task = await this.db
      .selectFrom('tasks')
      .selectAll()
      .where('id', '=', taskId)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const comment = await this.db
      .insertInto('comments')
      .values({
        id: uuidv4(),
        tenant_id: tenantId,
        task_id: taskId,
        user_id: userId,
        content: dto.content,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return {
      id: comment.id,
      content: comment.content,
      task_id: comment.task_id,
      user_id: comment.user_id,
    };
  }
}
