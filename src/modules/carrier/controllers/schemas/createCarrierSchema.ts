import { Type } from '@sinclair/typebox';

const body = Type.Object({
  name: Type.String(),
  fantasyName: Type.String(),
  federalTaxId: Type.String(),
});

export const createCarrierSchema = {
  body,
  response: {
    201: Type.Object({
      message: Type.String(),
    }),
    422: Type.Object({
      message: Type.String(),
    }),
    500: Type.Object({
      message: Type.String(),
    }),
  },
};
