import { FastifyRequest } from 'fastify';
import {
  IError, ErrorType, FindReleaseParams, CreateReleaseInput,
} from 'wizmi';
import {
  createRelease, findReleases, findReleaseWithChangelogs,
} from './services';
import { assignChangelogsToRelease } from '../changelogs/services';

export const getReleases = async () => {
  try {
    const releases = await findReleases();
    return releases;
  } catch (e) {
    throw e as IError;
  }
};

export const getReleaseWithChangelogs = async (req: FastifyRequest<{ Params: FindReleaseParams }>) => {
  const { id } = req.params;
  try {
    const release = await findReleaseWithChangelogs(id);
    if (!release) {
      throw { type: ErrorType.NOT_FOUND, key: 'level_not_found' } as IError;
    }
    return release;
  } catch (e) {
    throw e as IError;
  }
};

export const postRelease = async (req: FastifyRequest<{ Body: CreateReleaseInput }>) => {
  const { title } = req.body;
  try {
    const release = await createRelease(title);
    await assignChangelogsToRelease(release.id);
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};
