import { createCarrierUsecase } from '~modules/carrier/carrierFactory';
import { createCarrierSchema } from '~modules/carrier/controllers/schemas/createCarrierSchema';
import {
  FastifyReplyTypebox,
  FastifyRequestTypebox,
} from '~modules/shared/contracts/controller';

export const createCarrierController = async (
  req: FastifyRequestTypebox<typeof createCarrierSchema>,
  reply: FastifyReplyTypebox<typeof createCarrierSchema>,
) => {
  await createCarrierUsecase.execute({
    name: req.body.name,
    fantasyName: req.body.fantasyName,
    active: true,
    federalTaxId: req.body.federalTaxId,
  });

  return reply.status(201).send({
    message: 'Carrier has been created!',
  });
};
