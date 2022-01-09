import { FastifyRequest } from 'fastify';
import { ErrorType, IError } from 'wizmi';
import { CreateLevelInput, FindLevelInput } from './models';
import { createLevel, findOneLevel } from './services';

export const getOneLevel = async (req: FastifyRequest<FindLevelInput>) => {
  const { id } = req.params;
  try {
    const level = await findOneLevel(id);
    if (!level) {
      throw { type: ErrorType.NOT_FOUND, key: 'level_not_found' } as IError;
    }
    return level;
  } catch (e) {
    throw e as IError;
  }
};

export const postLevel = async (req: FastifyRequest<CreateLevelInput>) => {
  try {
    await createLevel({ Body: req.body });
    return { ok: true };
  } catch (e) {
    throw e as IError;
  }
};
