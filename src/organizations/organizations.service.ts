import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateOrganizationDto) {
    const organizationId = uuidv4();
    const userId = uuidv4();

    await this.db
      .insertInto('organizations')
      .values({
        id: organizationId,
        name: dto.name,
        tenant_id: organizationId,
      })
      .execute();

    const password_hash = await bcrypt.hash(dto.password, 12);

    await this.db
      .insertInto('users')
      .values({
        id: userId,
        email: dto.adminEmail,
        password_hash,
        first_name: 'Admin',
        last_name: '',
        role: 'Admin',
        is_active: true,
        tenant_id: organizationId,
        organization_id: organizationId,
      })
      .execute();

    return {
      organizationId,
      userId,
    };
  }
}
