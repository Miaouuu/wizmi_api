import './env';

import { fastify } from 'fastify';
import { PrismaClient } from '.prisma/client';
import { routes, routesWithAuth, routesWithAuthAdmin } from './api/routes';

const server = fastify();
const { PORT = 3000 } = process.env;

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
