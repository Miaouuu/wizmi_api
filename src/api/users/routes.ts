import { FastifyInstance } from 'fastify';
import me from './controller';
import meSchema from './schema';

const routesWithAuth = async (server: FastifyInstance) => {
  server.get('/me', {
    schema: meSchema,
    handler: me,
  });
};

export default routesWithAuth;
