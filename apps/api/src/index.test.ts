import { afterEach, describe, expect, test, vi } from 'vitest';

const originalPort = process.env.PORT;

async function getConfiguredPort(): Promise<number> {
  vi.resetModules();
  const module = await import('./index.js');
  return module.default.port;
}

afterEach(() => {
  if (originalPort === undefined) {
    delete process.env.PORT;
    return;
  }

  process.env.PORT = originalPort;
});

describe('index port configuration', () => {
  test('uses 3000 when PORT is missing', async () => {
    delete process.env.PORT;
    expect(await getConfiguredPort()).toBe(3000);
  });

  test('honors PORT=0', async () => {
    process.env.PORT = '0';
    expect(await getConfiguredPort()).toBe(0);
  });

  test('falls back for invalid negative PORT', async () => {
    process.env.PORT = '-1';
    expect(await getConfiguredPort()).toBe(3000);
  });
});
