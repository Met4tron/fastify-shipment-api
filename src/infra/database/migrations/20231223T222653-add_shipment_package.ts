import { Kysely, sql } from 'kysely';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('shipment_packages')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('tracking_code', 'varchar', (col) => col.unique().notNull())
    .addColumn('weight', 'integer', (col) => col.notNull())
    .addColumn('lengthCm', 'integer', (col) => col.notNull())
    .addColumn('widthCm', 'integer', (col) => col.notNull())
    .addColumn('heightCm', 'integer', (col) => col.notNull())
    .addColumn('zipcode', 'varchar', (col) => col.notNull())
    .addColumn('street', 'varchar', (col) => col.notNull())
    .addColumn('number', 'varchar', (col) => col.notNull())
    .addColumn('neighborhood', 'varchar', (col) => col.notNull())
    .addColumn('city', 'varchar', (col) => col.notNull())
    .addColumn('state', 'varchar', (col) => col.notNull())
    .addColumn('complement', 'varchar', (col) => col.defaultTo(''))
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`NOW()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp')
    .addColumn('shipment', 'varchar(36)', (col) =>
      col.references('shipments.id').onDelete('cascade').notNull(),
    )
    .execute();
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('shipment_packages').execute();
}
