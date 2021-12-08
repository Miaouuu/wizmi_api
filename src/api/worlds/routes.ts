import { FastifyInstance } from 'fastify';
import { getWorlds, postWorld } from './controller';

export const routes = async (server: FastifyInstance) => {
  server.get('/', {
    handler: getWorlds,
  });
};

export const routesWithAuthAdmin = async (server: FastifyInstance) => {
  server.post('/', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          value: { type: 'number' },
        },
        required: ['name', 'value'],
      },
    },
    handler: postWorld,
  });
};
