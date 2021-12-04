import { FastifyInstance, FastifyRequest } from 'fastify';

const routes = async (server: FastifyInstance) => {
  server.get('/me', {
    handler: async (req: FastifyRequest) => ({ me: req.user }),
  });
};

export default routes;
