import 'dotenv/config';
import Env from 'env-var';

const env = Env.get('NODE_ENV').asEnum([
  'development',
  'production',
  'test',
  'staging',
]);

export const config = {
  api: {
    port: Env.get('PORT').default(3000).asPortNumber(),
  },
  database: {
    port: Env.get('DB_PORT').required().asPortNumber(),
    host: Env.get('DB_HOST').required().asString(),
    user: Env.get('DB_USER').required().asString(),
    password: Env.get('DB_PASSWORD').required().asString(),
    db: Env.get('DB_DATABASE').required().asString(),
  },
  isDev: env === 'development',
  isProd: env === 'production',
  isTest: env === 'test',
};
