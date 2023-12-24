import {execSync} from 'child_process';
import {GenericContainer} from 'testcontainers';
import * as process from 'process';

let teardown = false;

export default async function () {
  const pgContainer = await new GenericContainer('postgres:alpine')
    .withExposedPorts(5432)
    .withEnvironment({
      POSTGRES_PASSWORD: 'test',
      POSTGRES_USER: 'test',
      POSTGRES_DB: 'test',
    })
    .start();

  const redisContainer = await new GenericContainer('redis')
    .withExposedPorts(6379)
    .start();

  process.env.DB_HOST = pgContainer.getHost();
  process.env.DB_PORT = pgContainer.getFirstMappedPort().toString();
  process.env.DATABASE_URL = `postgres://test:test@${pgContainer.getHost()}:${pgContainer.getFirstMappedPort()}/test?sslmode=disable`;

  execSync('pnpm run migrate');

  return async () => {
    if (teardown) {
      throw new Error('Teardown executed twice');
    }
    teardown = true;
    await Promise.all([pgContainer.stop(), redisContainer.stop()]);
  };
}
