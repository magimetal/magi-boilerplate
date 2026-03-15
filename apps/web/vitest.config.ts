import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';
import { sharedVitestConfig } from './vitest.shared';

export default defineConfig({
  plugins: [angular()],
  test: sharedVitestConfig,
});
