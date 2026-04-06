import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Add updated_at column to users table
  await db.schema
    .alterTable('users')
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  // Add CHECK constraint for role
  await sql`ALTER TABLE users ADD CONSTRAINT chk_users_role CHECK (role IN ('ADMIN','MEMBER'))`.execute(
    db,
  );

  // Add unique index on email (explicit named index)
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email)`.execute(
    db,
  );
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP INDEX IF EXISTS idx_users_email`.execute(db);
  await sql`ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_users_role`.execute(
    db,
  );
  await db.schema.alterTable('users').dropColumn('updated_at').execute();
}
