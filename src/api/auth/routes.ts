import { FastifyInstance } from 'fastify';
import { login, register } from './controller';
import { loginSchema, registerSchema } from './schema';

const routes = async (server: FastifyInstance) => {
  server.post('/login', {
    schema: loginSchema,
    handler: login,
  });

  server.post('/register', {
    schema: registerSchema,
    handler: register,
  });
};

export default routes;
