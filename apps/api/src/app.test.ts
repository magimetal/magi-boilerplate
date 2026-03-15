import { HealthResponseSchema, type HealthResponse } from '@magi-boilerplate/shared';
import { describe, expect, test } from 'vitest';

import { app } from './app.js';

describe('GET /health', () => {
  test('returns 200 with status ok', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);

    const body = (await res.json()) as { ok: boolean; data: HealthResponse };

    expect(body.ok).toBe(true);
    expect(body.data.status).toBe('ok');
    expect(typeof body.data.uptime).toBe('number');
  });
});

describe('GET /missing-route', () => {
  test('returns standardized 404 envelope', async () => {
    const res = await app.request('/missing-route');
    expect(res.status).toBe(404);

    const body = (await res.json()) as {
      ok: boolean;
      error: { code: string; message: string };
    };

    expect(body.ok).toBe(false);
    expect(body.error.code).toBe('NOT_FOUND');
    expect(body.error.message).toBe('Route not found');
  });
});

describe('HealthResponseSchema', () => {
  test('rejects status values other than ok', () => {
    expect(HealthResponseSchema.safeParse({ status: 'ok', uptime: 1 }).success).toBe(true);
    expect(HealthResponseSchema.safeParse({ status: 'healthy', uptime: 1 }).success).toBe(false);
  });
});
