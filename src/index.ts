import './env';

import { fastify } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import * as Sentry from '@sentry/node';
import { PrismaClient } from '.prisma/client';
import { routes, routesWithAuth, routesWithAuthAdmin } from './api/routes';

const server = fastify();
const { PORT = 3000, SENTRY_DSN = '', URL = '' } = process.env;

Sentry.init({
  dsn: SENTRY_DSN,
});

server.addHook('onError', async (_request, _reply, error) => {
  Sentry.captureException(error);
});

server.register(fastifyCors, {
  origin: '*',
});
server.register(fastifySwagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'API - Wizmi',
      description: 'API',
      version: '0.1.0',
    },
    host: URL,
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest(_request, _reply, next) { next(); },
    preHandler(_request, _reply, next) { next(); },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
});

server.register(routes);
server.register(routesWithAuth);
server.register(routesWithAuthAdmin);

const start = async () => {
  try {
    await server.listen(PORT, '0.0.0.0');
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
