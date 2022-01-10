import { FastifyInstance } from 'fastify';
import { getOneLevel, postLevel } from './controller';
import { getOneLevelSchema, postLevelSchema } from './schema';

export const routes = async (server: FastifyInstance) => {
  server.get('/:id', {
    schema: getOneLevelSchema,
    handler: getOneLevel,
  });
};

export const routesWithAuthAdmin = async (server: FastifyInstance) => {
  server.post('/', {
    schema: postLevelSchema,
    handler: postLevel,
  });
};
