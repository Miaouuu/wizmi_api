import { FastifyRequest } from 'fastify';
import { IError, CreateChangelogInput } from 'wizmi';
import { createChangelog } from './services';

const postChangelog = async (req: FastifyRequest<{ Body: CreateChangelogInput }>) => {
  try {
    await createChangelog(req.body);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};

export default postChangelog;
