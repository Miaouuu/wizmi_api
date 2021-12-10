import './env';

import { fastify } from 'fastify';
import * as Sentry from '@sentry/node';
import { PrismaClient } from '.prisma/client';
import { routes, routesWithAuth, routesWithAuthAdmin } from './api/routes';

const server = fastify();
const { PORT = 3000, SENTRY_DSN = '' } = process.env;

Sentry.init({
  dsn: SENTRY_DSN,
});

server.addHook('onError', async (_request, _reply, error) => {
  Sentry.captureException(error);
});
server.register(routes);
server.register(routesWithAuth);
server.register(routesWithAuthAdmin);

const start = async () => {
  try {
    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

declare module 'fastify' {
  interface FastifyRequest {
    user: { id: number };
  }

  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
