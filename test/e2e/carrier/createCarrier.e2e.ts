import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {generateCNPJ} from '@brazilian-utils/brazilian-utils';
import {faker} from '@faker-js/faker';
import {setupServer} from "~infra/app";

describe('POST - /v1/carriers', () => {
  const app = setupServer();

  beforeAll(async () => {
    await app.ready();
    await app.listen();
  });

  afterAll(async () => {
    await app.close();
  });

  it('201 - Should create a new carrier', async () => {
    const reqBody = {
      fantasyName: faker.company.name(),
      name: faker.company.name(),
      federalTaxId: generateCNPJ(),
    };

    const req = await app.inject({
      url: '/v1/carriers',
      body: reqBody,
      method: 'POST',
    });

    expect(req.statusCode).toEqual(201);
    expect(req.json()).toEqual({
      message: 'Carrier has been created!',
    });
  });

  it('400 - when invalid cnpj is provided', async () => {
    const reqCreateBody = {
      fantasyName: faker.company.name(),
      name: faker.company.name(),
      federalTaxId: null,
    };

    const reqCreate = await app.inject({
      url: '/v1/carriers',
      body: reqCreateBody,
      method: 'POST',
    });

    expect(reqCreate.statusCode).toEqual(400);
  });

  it('400 - when invalid fantasyName is provided', async () => {
    const reqCreateBody = {
      fantasyName: null,
      name: faker.company.name(),
      federalTaxId: generateCNPJ(),
    };

    const reqCreate = await app.inject({
      url: '/v1/carriers',
      body: reqCreateBody,
      method: 'POST',
    });

    expect(reqCreate.statusCode).toEqual(400);
  });

  it('400 - when invalid name is provided', async () => {
    const reqCreateBody = {
      fantasyName: faker.company.name(),
      name: null,
      federalTaxId: generateCNPJ(),
    };

    const reqCreate = await app.inject({
      url: '/v1/carriers',
      body: reqCreateBody,
      method: 'POST',
    });

    expect(reqCreate.statusCode).toEqual(400);
  });
});
