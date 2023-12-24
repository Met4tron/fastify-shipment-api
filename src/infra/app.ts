import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifySwagger from '@fastify/swagger';
import {
  TypeBoxTypeProvider,
  TypeBoxValidatorCompiler,
} from '@fastify/type-provider-typebox';
import fastifyScalarSwagger from '@scalar/fastify-api-reference';
import fastify from 'fastify';
import fastifyGracefulShutdown from 'fastify-graceful-shutdown';
import fastifyMetrics from 'fastify-metrics';
import { uuidv7 } from 'uuidv7';
import { getLogger } from '~config/logger';
import { carrierRoutes } from '~infra/routes/carrierRoutes';

export const setupServer = () => {
  const app = fastify({
    genReqId: (req) => {
      if (req.headers.correlationid) {
        return req.headers.correlationid.toString();
      }

      return uuidv7();
    },
    logger: getLogger('app'),
  })
    .setValidatorCompiler(TypeBoxValidatorCompiler)
    .withTypeProvider<TypeBoxTypeProvider>();

  app.register(fastifyMetrics, {
    endpoint: '/metrics',
    name: 'shipment-api',
  });
  app.register(fastifyCors);
  app.register(fastifyHelmet);
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Shipment API',
        description: 'OpenAPI definition about an API of Shipments',
        license: {
          name: 'MIT',
          url: 'https://opensource.org/license/mit/',
        },
        version: '1.0.0',
      },
      produces: ['application/json'],
    },
  });
  app.register(fastifyScalarSwagger, {
    routePrefix: '/docs',
  });
  app.register(fastifyGracefulShutdown);

  app.after(() => {
    app.gracefulShutdown((signal, next) => {
      app.log.info(`Application Shutdown due to signal ${signal}`);
      next();
    });
  });

  app.register(carrierRoutes, { prefix: '/v1/carriers' })

  return app;
};
