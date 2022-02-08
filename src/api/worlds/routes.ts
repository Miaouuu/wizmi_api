import { FastifyInstance } from 'fastify';
import { getWorlds, postWorld } from './controller';
import { getWorldsSchema, postWorldSchema } from './schema';

export const routes = async (server: FastifyInstance) => {
  server.get('/', {
    schema: getWorldsSchema,
    handler: getWorlds,
  });
};

export const routesWithAuthAdmin = async (server: FastifyInstance) => {
  server.post('/', {
    schema: postWorldSchema,
    handler: postWorld,
  });
};
