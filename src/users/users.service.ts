import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findById(id: string) {
    const user = await this.db
      .selectFrom('users')
      .select(['id', 'email', 'role', 'tenant_id', 'is_active', 'created_at'])
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
      .select(['id', 'email', 'role', 'tenant_id', 'is_active', 'created_at'])
      .where('tenant_id', '=', tenantId)
      .execute();
  }

  async findAllByTenant(tenantId: string): Promise<UserResponseDto[]> {
    const users = await this.db
      .selectFrom('users')
      .select(['id', 'email', 'role', 'created_at'])
      .where('tenant_id', '=', tenantId)
      .execute();

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: new Date(user.created_at).toISOString(),
    }));
  }
}
