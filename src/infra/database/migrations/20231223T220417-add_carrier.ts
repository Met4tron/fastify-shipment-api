import { Kysely, sql } from 'kysely';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('carriers')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.unique().notNull())
    .addColumn('fantasy_name', 'varchar', (col) => col.notNull())
    .addColumn('active', 'boolean', (col) => col.defaultTo(false).notNull())
    .addColumn('federal_tax_id', 'varchar(14)', (col) => col.unique().notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`NOW()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp')
    .execute();
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('carriers').execute();
}
