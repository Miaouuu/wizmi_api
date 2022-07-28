import { FastifyInstance } from 'fastify';
import fastifyAuth from 'fastify-auth';

import { isAdmin, verifToken, verifApiToken } from './auth/services';

import authRoutes from './auth/routes';
import changelogsWithToken from './changelogs/routes';
import * as feedbacks from './feedbacks/routes';
import * as levels from './levels/routes';
import * as releases from './releases/routes';
import userRoutesWithAuth from './users/routes';
import * as worlds from './worlds/routes';

export const routes = async (server: FastifyInstance) => {
  server.get('/', async () => 'oki');

  server.register(authRoutes, { prefix: '/auth' });
  server.register(feedbacks.routes, { prefix: '/feedbacks' });
  server.register(levels.routes, { prefix: '/levels' });
  server.register(releases.routes, { prefix: '/releases' });
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
    server.register(feedbacks.routesWithAuthAdmin, { prefix: '/feedbacks' });
    server.register(levels.routesWithAuthAdmin, { prefix: '/levels' });
    server.register(worlds.routesWithAuthAdmin, { prefix: '/worlds' });
  });
};

export const routesWithToken = async (server: FastifyInstance) => {
  server.register(fastifyAuth).after(() => {
    server.addHook('preHandler', server.auth([verifApiToken]));
    server.register(changelogsWithToken, { prefix: '/changelogs' });
    server.register(releases.routesWithToken, { prefix: '/releases' });
  });
};
