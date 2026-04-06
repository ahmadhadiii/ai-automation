import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from '../database/database.service';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  tenant_id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly db: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'changeme-secret-key',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.db
      .selectFrom('users')
      .select(['id', 'email', 'role', 'tenant_id'])
      .where('id', '=', payload.sub)
      .executeTakeFirst();

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
