import pino from 'pino';

const baseLogger = pino({});

export const getLogger = (name: string) => {
  return baseLogger.child({
    name,
  });
};
