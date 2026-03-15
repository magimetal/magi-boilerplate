import { app } from './app.js';

const DEFAULT_PORT = 3000;
const MIN_PORT = 0;
const MAX_PORT = 65535;

function parsePort(rawPort: string | undefined): number {
  if (rawPort === undefined) {
    return DEFAULT_PORT;
  }

  const normalizedPort = rawPort.trim();
  if (normalizedPort.length === 0) {
    return DEFAULT_PORT;
  }

  const parsedPort = Number(normalizedPort);
  if (!Number.isInteger(parsedPort)) {
    return DEFAULT_PORT;
  }

  if (parsedPort < MIN_PORT || parsedPort > MAX_PORT) {
    return DEFAULT_PORT;
  }

  return parsedPort;
}

const port = parsePort(process.env.PORT);

export default {
  port,
  fetch: app.fetch,
  idleTimeout: 120,
};
