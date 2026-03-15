import type { Context } from 'hono';

export function jsonError(
  c: Context,
  code: string,
  message: string,
  status: 400 | 404 | 409 | 500 | 502 = 400,
  details?: unknown,
): Response {
  return c.json(
    { ok: false, error: { code, message, ...(details !== undefined && { details }) } },
    status,
  );
}
