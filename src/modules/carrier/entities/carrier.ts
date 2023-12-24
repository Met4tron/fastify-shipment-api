import { uuidv7 } from 'uuidv7';

export type CarrierDTO = {
  id?: string;
  name: string;
  fantasyName: string;
  federalTaxId: string;
  active: boolean;
};

export class Carrier {
  id: string;
  name: string;
  fantasyName: string;
  federalTaxId: string;
  active: boolean;

  constructor(carrierDto: CarrierDTO) {
    this.name = carrierDto.name;
    this.fantasyName = carrierDto.fantasyName;
    this.federalTaxId = carrierDto.federalTaxId;
    this.active = carrierDto.active;
    this.id = carrierDto?.id ?? uuidv7();
  }
}
