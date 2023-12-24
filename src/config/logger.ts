import pino from 'pino';
import {config} from "~config/environment";

const baseLogger = pino({
  enabled: !config.isTest
});

export const getLogger = (name: string) => {
  return baseLogger.child({
    name,
  });
};
