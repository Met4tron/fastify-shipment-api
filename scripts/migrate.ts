import * as path from 'path'
import { promises as fs } from 'fs'
import pg from 'pg'
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely'
import { run } from 'kysely-migration-cli'

const migrationFolder = new URL('../src/infra/database/migrations', import.meta.url).pathname

// biome-ignore lint/suspicious/noExplicitAny: migration schema details
const  db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder,
  }),
})

run(db, migrator, migrationFolder)