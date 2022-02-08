import { FastifyInstance } from 'fastify';
import postChangelog from './controller';
import postChangelogSchema from './schema';

const routesWithToken = async (server: FastifyInstance) => {
  server.post('/', {
    schema: postChangelogSchema,
    handler: postChangelog,
  });
};

export default routesWithToken;
