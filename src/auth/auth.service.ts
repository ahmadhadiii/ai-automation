import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', dto.email)
      .executeTakeFirst();

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const organizationId = uuidv4();
    const tenantId = organizationId;

    await this.db
      .insertInto('organizations')
      .values({
        id: organizationId,
        name: `${dto.first_name}'s Organization`,
        tenant_id: tenantId,
      })
      .execute();

    const password_hash = await bcrypt.hash(dto.password, 12);
    const userId = uuidv4();

    const user = await this.db
      .insertInto('users')
      .values({
        id: userId,
        email: dto.email,
        password_hash,
        first_name: dto.first_name,
        last_name: dto.last_name,
        role: 'Member',
        tenant_id: tenantId,
        organization_id: organizationId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      tenant_id: user.tenant_id,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', dto.email)
      .executeTakeFirst();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.password_hash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenant_id: user.tenant_id,
    };

    const refreshToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.db
      .insertInto('refresh_tokens')
      .values({
        id: uuidv4(),
        user_id: user.id,
        token: refreshToken,
        expires_at: expiresAt,
      })
      .execute();

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenant_id: user.tenant_id,
      },
    };
  }

  async refresh(dto: RefreshTokenDto) {
    const tokenRecord = await this.db
      .selectFrom('refresh_tokens')
      .selectAll()
      .where('token', '=', dto.refresh_token)
      .executeTakeFirst();

    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (new Date(tokenRecord.expires_at) < new Date()) {
      await this.db
        .deleteFrom('refresh_tokens')
        .where('id', '=', tokenRecord.id)
        .execute();
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', tokenRecord.user_id)
      .executeTakeFirst();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenant_id: user.tenant_id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
