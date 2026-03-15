export const sharedVitestConfig = {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['src/setup-vitest.ts'],
  include: ['src/**/*.spec.ts'],
};
