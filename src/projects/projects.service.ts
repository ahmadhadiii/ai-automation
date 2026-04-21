import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly db: DatabaseService) {}

  async create(userId: string, tenantId: string, dto: CreateProjectDto) {
    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', userId)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirstOrThrow();

    const record = await this.db
      .insertInto('projects')
      .values({
        id: uuidv4(),
        tenant_id: tenantId,
        organization_id: user.organization_id,
        name: dto.name,
        description: dto.description || null,
        deadline: null,
        status: 'Active',
        created_by: userId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return record;
  }

  async findAll(tenantId: string, query: any) {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 20, 100);
    const offset = (page - 1) * limit;

    const [{ count }] = await this.db
      .selectFrom('projects')
      .select(this.db.fn.count('id').as('count'))
      .where('tenant_id', '=', tenantId)
      .execute();

    const data = await this.db
      .selectFrom('projects')
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

  async findOne(id: string, tenantId: string) {
    const record = await this.db
      .selectFrom('projects')
      .selectAll()
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!record) {
      throw new NotFoundException('Project not found');
    }

    return record;
  }

  async update(id: string, tenantId: string, dto: UpdateProjectDto) {
    const record = await this.db
      .updateTable('projects')
      .set({ ...dto, updated_at: new Date() })
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .returningAll()
      .executeTakeFirst();

    if (!record) {
      throw new NotFoundException('Project not found');
    }

    return record;
  }

  async remove(id: string, tenantId: string) {
    const result = await this.db
      .deleteFrom('projects')
      .where('id', '=', id)
      .where('tenant_id', '=', tenantId)
      .executeTakeFirst();

    if (!result.numDeletedRows) {
      throw new NotFoundException('Project not found');
    }
  }
}
