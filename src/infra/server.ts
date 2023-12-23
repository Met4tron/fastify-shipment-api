import app from './app';
import {config} from "~config/environment";

async function bootstrap() {
  try {
    await app.ready();
    await app.listen({
      host: '0.0.0.0',
      port: config.api.port
    })
  } catch (e) {
    app.log.error(e);
  }
}
bootstrap()