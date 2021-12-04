import { FastifyInstance } from 'fastify';
import fastifyAuth from 'fastify-auth';
import verifToken from './auth/services';
import userRoutes from './users/routes';

export const routes = async (server: FastifyInstance) => {
  server.get('/', async () => 'ok');
};

export const routesWithAuth = async (server: FastifyInstance) => {
  server.register(fastifyAuth).after(() => {
    server.addHook('preHandler', server.auth([verifToken]));
    server.register(userRoutes);
  });
};
