'use strict';

const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    include: ['src/**/*.test.js'],
    environment: 'node',
    globals: true,
  },
});
