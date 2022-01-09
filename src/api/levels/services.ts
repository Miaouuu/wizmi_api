import { ErrorType, IError } from 'wizmi';
import prisma from '../../prisma';
import { CreateLevelInput } from './models';

export const findOneLevel = async (id: number) => {
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
  Body: {
    name, reward, data, worldId, type,
  },
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
