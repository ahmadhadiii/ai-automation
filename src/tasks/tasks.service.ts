import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateTaskDto, userId: string, tenantId: string) {
    const id = uuidv4();
    return this.db
      .insertInto('tasks')
      .values({
        id,
        title: dto.title,
        description: dto.description || null,
        status: dto.status || 'ToDo',
        project_id: dto.project_id,
        assignee_id: dto.assignee_id || null,
        created_by: userId,
        tenant_id: tenantId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findAll(tenantId: string) {
    return this.db
      .selectFrom('tasks')
      .selectAll()
      .where('tenant_id', '=', tenantId)
      .orderBy('created_at', 'desc')
      .execute();
  }

  async findOne(id: string, tenantId: string) {
    const task = await this.db
      .selectFrom('tasks')
      .selectAll()
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: string, dto: UpdateTaskDto, tenantId: string) {
    const task = await this.db
      .updateTable('tasks')
      .set({ ...dto })
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .returningAll()
      .executeTakeFirst();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async remove(id: string, tenantId: string) {
    const result = await this.db
      .deleteFrom('tasks')
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .returningAll()
      .executeTakeFirst();

    if (!result) {
      throw new NotFoundException('Task not found');
    }

    return result;
  }
}
