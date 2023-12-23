import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifySensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import fastifyScalarSwagger from '@scalar/fastify-api-reference';
import fastify from 'fastify';
import fastifyGracefulShutdown from 'fastify-graceful-shutdown';
import { uuidv7 } from 'uuidv7';
import { getLogger } from '~config/logger';

const app = fastify({
  genReqId: (req) => {
    if (req.headers.correlationid) {
      return req.headers.correlationid.toString();
    }

    return uuidv7();
  },
  logger: getLogger('app'),
});

app.register(fastifyCors);
app.register(fastifyHelmet);
app.register(fastifySensible);
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Shipment API',
      description: 'OpenAPI definition about an API of Shipments',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/license/mit/',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development',
      },
      {
        url: 'http://localhost:3000',
        description: 'Production',
      },
    ],
  },
});
app.register(fastifyScalarSwagger, {
  routePrefix: '/docs',
  configuration: {
    theme: 'purple',
    spec: {
      content: () => app.swagger(),
    },
  },
});
app.register(fastifyGracefulShutdown);

app.after(() => {
  app.gracefulShutdown((signal, next) => {
    app.log.info(`Application Shutdown due to signal ${signal}`);
    next();
  });
});

export default app;
