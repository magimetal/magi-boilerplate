/// <reference types="vitest/config" />

import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';
import { sharedVitestConfig } from './vitest.shared';

export default defineConfig({
  plugins: [angular()],
  test: sharedVitestConfig,
});
