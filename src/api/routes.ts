import { FastifyInstance } from 'fastify';
import fastifyAuth from 'fastify-auth';

import { isAdmin, verifToken } from './auth/services';

import authRoutes from './auth/routes';
import userRoutesWithAuth from './users/routes';
import * as worlds from './worlds/routes';

export const routes = async (server: FastifyInstance) => {
  server.get('/', async () => 'ok');

  server.register(authRoutes, { prefix: '/auth' });
  server.register(worlds.routes, { prefix: '/worlds' });
};

export const routesWithAuth = async (server: FastifyInstance) => {
  server.register(fastifyAuth).after(() => {
    server.addHook('preHandler', server.auth([verifToken]));
    server.register(userRoutesWithAuth, { prefix: '/users' });
  });
};

export const routesWithAuthAdmin = async (server: FastifyInstance) => {
  server.register(fastifyAuth).after(() => {
    server.addHook('preHandler', server.auth([verifToken, isAdmin], { relation: 'and' }));
    server.register(worlds.routesWithAuthAdmin, { prefix: '/worlds' });
  });
};
