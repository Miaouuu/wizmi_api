import { FastifyRequest } from 'fastify';
import { CreateLevelInput, FindLevelInput } from './models';
import { createLevel, findOneLevel } from './services';

export const getOneLevel = async (req: FastifyRequest<FindLevelInput>) => {
  const { id } = req.params;
  try {
    const level = await findOneLevel(id);
    if (!level) {
      return {
        message: 'No level',
      };
    }
    return level;
  } catch {
    throw new Error('Error server !');
  }
};

export const postLevel = async (req: FastifyRequest<CreateLevelInput>) => {
  try {
    await createLevel({ Body: req.body });
    return { ok: true };
  } catch {
    throw new Error('Error server !');
  }
};
