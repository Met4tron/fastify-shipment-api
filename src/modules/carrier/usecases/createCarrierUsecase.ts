import { CarrierStorage } from '~modules/carrier/contracts/carrierStorage';
import { Carrier } from '~modules/carrier/entities/carrier';
import { UseCase } from '~modules/shared/contracts/usecase';

export type CreateCarrierInput = {
  name: string;
  fantasyName: string;
  federalTaxId: string;
  active: boolean;
};

export type CreateCarrierOutput = {
  id: string;
  name: string;
  fantasyName: string;
  federalTaxId: string;
  active: boolean;
};

export class CreateCarrierUsecase
  implements UseCase<CreateCarrierInput, CreateCarrierOutput>
{
  constructor(private carrierStorage: CarrierStorage) {}

  async execute(data: CreateCarrierInput): Promise<CreateCarrierOutput> {
    try {
      const newCarrier = new Carrier({
        name: data.name,
        fantasyName: data.fantasyName,
        federalTaxId: data.federalTaxId,
        active: data.active,
      });

      const createdCarrier = await this.carrierStorage.create(newCarrier);

      return createdCarrier;
    } catch (e) {
      throw new Error(e);
    }
  }
}
