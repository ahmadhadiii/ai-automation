import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { DatabaseService } from './database.service';
import { sql } from 'kysely';

@Controller('database')
export class DatabaseController {
  constructor(private readonly db: DatabaseService) {}

  @Public()
  @Get('health')
  async health() {
    await sql`SELECT 1`.execute(this.db);
    return { status: 'ok' };
  }
}
