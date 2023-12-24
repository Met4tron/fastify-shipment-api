import { dbClient } from '~infra/database/connection';
import { CarrierRepository } from '~modules/carrier/repositories/carrierRepository';
import { CreateCarrierUsecase } from '~modules/carrier/usecases/createCarrierUsecase';

export const carrierStorage = new CarrierRepository(dbClient);
export const createCarrierUsecase = new CreateCarrierUsecase(carrierStorage);
