import { HealthResponseSchema } from '@magi-boilerplate/shared';
import { jsonError, jsonOk } from '@magi-boilerplate/utils';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono();

app.use('*', logger());
app.use('*', cors({ origin: 'http://localhost:4200' }));

app.get('/health', (c) => {
  const healthPayload = HealthResponseSchema.parse({
    status: 'ok',
    uptime: process.uptime(),
  });

  return jsonOk(c, healthPayload);
});

app.notFound((c) => jsonError(c, 'NOT_FOUND', 'Route not found', 404));

export { app };
