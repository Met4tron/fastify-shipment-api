import { Kysely } from 'kysely';

import { DB } from '~infra/database/schema';
import { CarrierStorage } from '~modules/carrier/contracts/carrierStorage';
import { Carrier } from '~modules/carrier/entities/carrier';
import * as carrierMapper from '~modules/carrier/mappers/carrierMapper';

export class CarrierRepository implements CarrierStorage {
  constructor(private dbClient: Kysely<DB>) {}

  async create(carrier: Carrier): Promise<Carrier> {
    const data = carrierMapper.toPersistence(carrier);
    const newCarrier = await this.dbClient
      .insertInto('carriers')
      .values(data)
      .returningAll()
      .executeTakeFirst();

    if (!newCarrier) {
      throw new Error('Invalid carrier creation');
    }

    return carrierMapper.toDomain(newCarrier);
  }
}
