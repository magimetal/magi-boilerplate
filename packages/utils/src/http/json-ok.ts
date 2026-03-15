import type { Context } from 'hono';

export function jsonOk<T>(c: Context, data: T, status: 200 | 201 = 200): Response {
  return c.json({ ok: true, data }, status);
}
