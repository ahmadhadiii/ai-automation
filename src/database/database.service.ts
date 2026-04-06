import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kysely, PostgresDialect, sql } from 'kysely';
import { Pool } from 'pg';
import { Database } from './types';

@Injectable()
export class DatabaseService
  extends Kysely<Database>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    super({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432', 10),
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.DB_NAME || 'task_management',
        }),
      }),
    });
  }

  async onModuleInit() {
    await sql`SELECT 1`.execute(this);
    this.logger.log('Database connection established');
  }

  async onModuleDestroy() {
    await this.destroy();
  }
}
