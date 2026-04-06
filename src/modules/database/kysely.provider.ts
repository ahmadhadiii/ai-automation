import { Provider } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './database.types';

export const KYSELY = 'KYSELY';

export const kyselyProvider: Provider = {
  provide: KYSELY,
  useFactory: (): Kysely<Database> => {
    return new Kysely<Database>({
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
  },
};
