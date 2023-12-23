import { Kysely, sql } from 'kysely';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('shipments')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('amount', 'varchar', (col) => col.unique().notNull())
    .addColumn('weight', 'varchar', (col) => col.unique().notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`NOW()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp')
    .addColumn('carrier', 'varchar(36)', (col) =>
      col.references('carriers.id').onDelete('cascade').notNull(),
    )
    .execute();
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('shipments').execute();
}
