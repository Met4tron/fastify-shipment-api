import { Kysely, sql } from 'kysely';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('invoices')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('key_nfe', 'varchar(44)', (col) => col.notNull())
    .addColumn('series', 'varchar(3)', (col) => col.notNull())
    .addColumn('number_nfe', 'varchar(9)', (col) => col.notNull())
    .addColumn('amount', 'integer', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`NOW()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp')
    .addColumn('shipment_package', 'varchar(36)', (col) =>
      col.references('shipment_packages.id').onDelete('cascade').notNull(),
    )
    .execute();

  await db.schema
    .createTable('invoice_descriptions')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('description', 'varchar(100)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`NOW()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp')
    .addColumn('invoice', 'varchar(36)', (col) =>
      col.references('invoices.id').onDelete('cascade').notNull(),
    )
    .execute();
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('invoices').execute();
  await db.schema.dropTable('invoice_descriptions').execute();
}
