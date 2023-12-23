import { config } from '~config/environment';
import app from './app';

async function bootstrap() {
  try {
    await app.ready();
    await app.listen({
      host: '0.0.0.0',
      port: config.api.port,
    });
  } catch (e) {
    app.log.error(e);
  }
}
bootstrap();
