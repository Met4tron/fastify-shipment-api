import { Kysely, sql } from 'kysely';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('shipment_addresses')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('zipcode', 'varchar', (col) => col.unique().notNull())
    .addColumn('street', 'varchar', (col) => col.unique().notNull())
    .addColumn('neighborhood', 'varchar', (col) => col.unique().notNull())
    .addColumn('city', 'varchar', (col) => col.unique().notNull())
    .addColumn('state', 'varchar', (col) => col.unique().notNull())
    .addColumn('ibge', 'varchar', (col) => col.unique().notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`NOW()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp')
    .execute();
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('shipment_addresses').execute();
}
