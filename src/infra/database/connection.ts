import { Kysely, PostgresDialect } from 'kysely';
import PG from 'pg';
import { config } from '~config/environment';
import { DB } from '~infra/database/schema';

const pool = new PG.Pool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.db,
});

const dialect = new PostgresDialect({
  pool,
});

export const dbClient = new Kysely<DB>({
  dialect,
});
