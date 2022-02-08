import { FastifyInstance } from 'fastify';
import { getReleases, getReleaseWithChangelogs, postRelease } from './controller';
import { getReleasesSchema, getReleaseWithChangelogsSchema, postReleaseSchema } from './schema';

export const routes = async (server: FastifyInstance) => {
  server.get('/', {
    schema: getReleasesSchema,
    handler: getReleases,
  });

  server.get('/:id', {
    schema: getReleaseWithChangelogsSchema,
    handler: getReleaseWithChangelogs,
  });
};

export const routesWithToken = async (server: FastifyInstance) => {
  server.post('/', {
    schema: postReleaseSchema,
    handler: postRelease,
  });
};
