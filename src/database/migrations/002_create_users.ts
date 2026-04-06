import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Ensure unique index on email exists
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email)`.execute(
    db,
  );
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP INDEX IF EXISTS idx_users_email_unique`.execute(db);
}
