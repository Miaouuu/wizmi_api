import { FastifyInstance } from 'fastify';
import { getAllWorlds, postWorld } from './controller';
import { getAllWorldsSchema, postWorldSchema } from './schema';

export const routes = async (server: FastifyInstance) => {
  server.get('/', {
    schema: getAllWorldsSchema,
    handler: getAllWorlds,
  });
};

export const routesWithAuthAdmin = async (server: FastifyInstance) => {
  server.post('/', {
    schema: postWorldSchema,
    handler: postWorld,
  });
};
