import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findById(id: string) {
    const user = await this.db
      .selectFrom('users')
      .select(['id', 'email', 'name', 'role', 'tenant_id', 'created_at', 'updated_at'])
      .where('id', '=', id)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByTenant(tenantId: string) {
    return this.db
      .selectFrom('users')
      .select(['id', 'email', 'name', 'role', 'tenant_id', 'created_at', 'updated_at'])
      .where('tenant_id', '=', tenantId)
      .execute();
  }
}
