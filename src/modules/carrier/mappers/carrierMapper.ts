import { Selectable } from 'kysely';
import { Carriers } from '~infra/database/schema';
import { Carrier } from '~modules/carrier/entities/carrier';

export const toPersistence = (carrierDto: Carrier) => {
  return {
    id: carrierDto.id,
    name: carrierDto.name,
    fantasy_name: carrierDto.fantasyName,
    federal_tax_id: carrierDto.federalTaxId,
    active: carrierDto.active,
  };
};

export const toDomain = (carrier: Selectable<Carriers>): Carrier => {
  return {
    id: carrier.id,
    name: carrier.name,
    fantasyName: carrier.fantasy_name,
    federalTaxId: carrier.federal_tax_id,
    active: carrier.active,
  };
};
