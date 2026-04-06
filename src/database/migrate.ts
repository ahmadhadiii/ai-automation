import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { up } from './migrations/001_initial';
import { up as upInitUsers } from './migrations/001_init_users';

async function migrate() {
  const db = new Kysely<any>({
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

  console.log('Running migrations...');
  await up(db);
  await upInitUsers(db);
  console.log('Migrations completed successfully.');
  await db.destroy();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
