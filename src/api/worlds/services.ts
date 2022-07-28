import { ErrorType, IError } from 'wizmi';
import prisma from '../../prisma';

export const findWorlds = async () => {
  try {
    const worlds = await prisma.worlds.findMany({
      orderBy: {
        value: 'asc',
      },
      include: {
        levels: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
    return worlds;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const createWorld = async (name: string, value: number) => {
  try {
    await prisma.worlds.create({
      data: {
        name,
        value,
      },
    });
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};
