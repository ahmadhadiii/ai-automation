import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateOrganizationDto) {
    const existing = await this.db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', dto.email)
      .executeTakeFirst();

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const organizationId = uuidv4();
    const tenantId = uuidv4();
    const userId = uuidv4();

    await this.db
      .insertInto('organizations')
      .values({
        id: organizationId,
        name: dto.name,
        tenant_id: tenantId,
      })
      .execute();

    const password_hash = await bcrypt.hash(dto.password, 12);

    await this.db
      .insertInto('users')
      .values({
        id: userId,
        email: dto.email,
        password_hash,
        first_name: dto.first_name,
        last_name: dto.last_name,
        role: 'Admin',
        tenant_id: tenantId,
        organization_id: organizationId,
      })
      .execute();

    const payload = {
      sub: userId,
      email: dto.email,
      role: 'Admin',
      tenant_id: tenantId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userId,
        email: dto.email,
        role: 'Admin',
        tenant_id: tenantId,
      },
    };
  }
}
