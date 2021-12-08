import prisma from '../../prisma';

export const findAllWorlds = async () => {
  try {
    const worlds = await prisma.worlds.findMany({
      orderBy: {
        value: 'asc',
      },
      include: {
        levels: true,
      },
    });
    return worlds;
  } catch {
    throw new Error('Error server !');
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
    throw new Error('Error server !');
  }
};
