import { ErrorType, IError, CreateLevelInput } from 'wizmi';
import prisma from '../../prisma';

export const findLevel = async (id: number) => {
  try {
    const level = await prisma.levels.findFirst({
      where: {
        id,
      },
    });
    return level;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const createLevel = async ({
  name, reward, data, worldId, type,
}: CreateLevelInput) => {
  try {
    if (type === 'SQUARE') {
      await prisma.levels.create({
        data: {
          name,
          reward,
          data,
          worldId,
          type,
        },
      });
    }
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};
