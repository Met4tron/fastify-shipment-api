import { config } from '~config/environment';
import { setupServer } from './app';

async function bootstrap() {
  const server = setupServer();
  try {
    await server.ready();
    await server.listen({
      host: '0.0.0.0',
      port: config.api.port,
    });
  } catch (e) {
    server.log.error(e);
  }
}
bootstrap();
