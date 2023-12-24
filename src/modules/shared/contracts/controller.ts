import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  ContextConfigDefault,
  FastifyReply,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';

import { RouteGenericInterface } from 'fastify/types/route';
import { FastifySchema } from 'fastify/types/schema';

export type FastifyRequestTypebox<TSchema extends FastifySchema> =
  FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
  >;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>;
