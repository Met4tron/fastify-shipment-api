import { configDefaults, defineConfig } from 'vitest/config'

import * as path from "path";

export default defineConfig({
  test: {
    reporters: ['verbose'],
    exclude: [...configDefaults.exclude],
    alias: {
      '@modules': path.resolve(__dirname, './src/modules'),
      '@infra': path.resolve(__dirname, './src/infra'),
      '@config': path.resolve(__dirname, './src/config'),
    },
    globals: true,
  },
})