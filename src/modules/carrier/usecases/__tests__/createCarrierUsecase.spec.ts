import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import {CreateCarrierUsecase} from "~modules/carrier/usecases/createCarrierUsecase";
import {CarrierStorage} from "~modules/carrier/contracts/carrierStorage";
import * as carrierFixture from '../../../../../test/__fixtures__/carrierFixture'

vi.mock('uuidv7', () => ({
  uuidv7: vi.fn().mockReturnValue('00ccebbc-13e0-7000-8b18-6150ad2d0c05'),
}));

describe('CreateCarrierUsecase', () => {
  let sut: CreateCarrierUsecase;
  const mockCarrierRepository = mock<CarrierStorage>();
  const carrierEntityFixture = carrierFixture.carrierEntityFixture.build();

  const makeSut = () => {
    return new CreateCarrierUsecase(mockCarrierRepository);
  };

  beforeEach(() => {
    sut = makeSut();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create a new carrier', async () => {
    mockCarrierRepository.create.mockResolvedValue(carrierEntityFixture);

    const response = await sut.execute({
      name: carrierEntityFixture.name,
      fantasyName: carrierEntityFixture.fantasyName,
      federalTaxId: carrierEntityFixture.federalTaxId,
      active: true
    });

    expect(response).toEqual(carrierEntityFixture);
    expect(mockCarrierRepository.create).toHaveBeenCalledOnce();
    expect(mockCarrierRepository.create).toHaveBeenCalledWith({
      name: carrierEntityFixture.name,
      fantasyName: carrierEntityFixture.fantasyName,
      federalTaxId: carrierEntityFixture.federalTaxId,
      active: true,
      id: '00ccebbc-13e0-7000-8b18-6150ad2d0c05',
    });
  });
});
