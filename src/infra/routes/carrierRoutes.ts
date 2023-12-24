import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { createCarrierController } from '~modules/carrier/controllers/createCarrierController';
import { createCarrierSchema } from '~modules/carrier/controllers/schemas/createCarrierSchema';

export const carrierRoutes: FastifyPluginAsync = async (
  app: FastifyInstance,
  _opts,
) => {
  app.route({
    method: 'POST',
    url: '/',
    schema: createCarrierSchema,
    handler: createCarrierController,
  });
};
