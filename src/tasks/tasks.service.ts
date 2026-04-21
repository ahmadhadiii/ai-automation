import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly db: DatabaseService) {}

  async create(projectId: string, userId: string, tenantId: string, dto: CreateTaskDto) {
    const project = await this.db
      .selectFrom('projects')
      .selectAll()
      .where('id', '=', projectId)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (dto.assigned_to) {
      const assignee = await this.db
        .selectFrom('users')
        .selectAll()
        .where('id', '=', dto.assigned_to)
        .where('tenant_id', '=', tenantId)
        .executeTakeFirst();

      if (!assignee) {
        throw new BadRequestException('Assigned user does not belong to this tenant');
      }
    }

    const task = await this.db
      .insertInto('tasks')
      .values({
        id: uuidv4(),
        title: dto.title,
        description: dto.description || null,
        status: dto.status || 'ToDo',
        priority: null,
        project_id: projectId,
        assignee_id: dto.assigned_to || null,
        due_date: null,
        created_by: userId,
        tenant_id: tenantId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return {
      id: task.id,
      title: task.title,
      status: task.status,
      project_id: task.project_id,
      assigned_to: task.assignee_id,
    };
  }
}
