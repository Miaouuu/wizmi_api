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
    throw new Error('Error server !');
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
    throw new Error('Error server !');
  }
};
