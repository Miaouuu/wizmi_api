import './env';

import { fastify } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import * as Sentry from '@sentry/node';
import { PrismaClient } from '@prisma/client';
import { IError, ErrorType } from 'wizmi';
import { routes, routesWithAuth, routesWithAuthAdmin } from './api/routes';
import swaggerOptions from './swagger';

const server = fastify();
const { PORT = 8016, SENTRY_DSN = '' } = process.env;

Sentry.init({
  dsn: SENTRY_DSN,
});

server.setErrorHandler((error, _request, reply) => {
  Sentry.captureException(error);
  if (error.validation) {
    const errorValidation: IError = { type: ErrorType.BAD_REQUEST, key: 'validation_error' };
    reply.status(errorValidation.type).send(errorValidation);
  }
  reply.status(error.type).send(error);
});

server.register(fastifyCors, {
  origin: '*',
});

server.register(fastifySwagger, swaggerOptions);

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

  interface FastifyError extends IError {
    [key: string]: string
  }

  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
