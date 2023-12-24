import { Carrier } from '~modules/carrier/entities/carrier';

export interface CarrierStorage {
  create(carrier: Carrier): Promise<Carrier>;
}
