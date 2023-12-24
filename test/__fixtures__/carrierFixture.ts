import { faker } from '@faker-js/faker';
import {generateCNPJ } from '@brazilian-utils/brazilian-utils'
import { Factory } from 'fishery';
import { uuidv7 } from 'uuidv7';
import {Carrier} from "~modules/carrier/entities/carrier";

export const carrierEntityFixture = Factory.define<Carrier>(({ params }) => ({
  id: uuidv7(),
  name: faker.company.name(),
  fantasyName: faker.company.buzzNoun(),
  federalTaxId: generateCNPJ(),
  active: true,
  ...params,
}));