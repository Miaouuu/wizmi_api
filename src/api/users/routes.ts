import { FastifyInstance } from 'fastify';
import me from './controller';

const routesWithAuth = async (server: FastifyInstance) => {
  server.get('/me', {
    handler: me,
  });
};

export default routesWithAuth;
