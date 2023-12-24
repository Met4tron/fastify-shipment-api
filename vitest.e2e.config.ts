import {configDefaults, defineConfig, mergeConfig} from 'vitest/config';
import vitestConfig from './vitest.config';
import path from 'path';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, '**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      include: ['./test/e2e/**/*.e2e.ts'],
      alias: {
        '~modules': path.resolve(__dirname, './src/modules'),
        '~infra': path.resolve(__dirname, './src/infra'),
        '~config': path.resolve(__dirname, './src/config'),
      },
      globals: true,
      environment: 'node',
      globalSetup: ['./test/utils/globalSetup'],
      env: {
        DB_USER: 'test',
        DB_PASSWORD: 'test',
        DB_DATABASE: 'test',
      },
    },
  }),
);
