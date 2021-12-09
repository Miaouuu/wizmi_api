import { FastifyInstance } from 'fastify';
import { getOneLevel, postLevel } from './controller';

export const routes = async (server: FastifyInstance) => {
  server.get('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
        required: ['id'],
      },
    },
    handler: getOneLevel,
  });
};

export const routesWithAuthAdmin = async (server: FastifyInstance) => {
  server.post('/', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          reward: { type: 'string' },
          data: { type: 'string' },
          worldId: { type: 'number' },
          type: { type: 'string' },
        },
        required: ['name', 'reward', 'data', 'worldId', 'type'],
      },
    },
    handler: postLevel,
  });
};
