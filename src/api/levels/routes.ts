import { FastifyInstance } from 'fastify';
import { getLevel, postLevel } from './controller';
import { getLevelSchema, postLevelSchema } from './schema';

export const routes = async (server: FastifyInstance) => {
  server.get('/:id', {
    schema: getLevelSchema,
    handler: getLevel,
  });
};

export const routesWithAuthAdmin = async (server: FastifyInstance) => {
  server.post('/', {
    schema: postLevelSchema,
    handler: postLevel,
  });
};
