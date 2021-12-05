import { FastifyInstance } from 'fastify';
import { login, register } from './controller';

const routes = async (server: FastifyInstance) => {
  server.post('/login', {
    schema: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['email', 'password'],
      },
    },
    handler: login,
  });

  server.post('/register', {
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['username', 'email', 'password'],
      },
    },
    handler: register,
  });
};

export default routes;
