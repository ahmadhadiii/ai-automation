import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateProjectDto, userId: string, tenantId: string) {
    const id = uuidv4();
    return this.db
      .insertInto('projects')
      .values({
        id,
        name: dto.name,
        organization_id: dto.organization_id,
        created_by: userId,
        status: 'Active',
        tenant_id: tenantId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findAll(tenantId: string) {
    return this.db
      .selectFrom('projects')
      .selectAll()
      .where('tenant_id', '=', tenantId)
      .orderBy('created_at', 'desc')
      .execute();
  }

  async findOne(id: string, tenantId: string) {
    const project = await this.db
      .selectFrom('projects')
      .selectAll()
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, dto: UpdateProjectDto, tenantId: string) {
    const project = await this.db
      .updateTable('projects')
      .set({ ...dto })
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .returningAll()
      .executeTakeFirst();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async remove(id: string, tenantId: string) {
    const result = await this.db
      .deleteFrom('projects')
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .returningAll()
      .executeTakeFirst();

    if (!result) {
      throw new NotFoundException('Project not found');
    }

    return result;
  }
}
