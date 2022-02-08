import { ErrorType, IError } from 'wizmi';
import prisma from '../../prisma';

export const findReleases = async () => {
  try {
    const releases = await prisma.releases.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return releases;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const findReleaseWithChangelogs = async (id: number) => {
  try {
    const level = await prisma.releases.findFirst({
      where: {
        id,
      },
      include: {
        changelogs: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return level;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const createRelease = async (title: string) => {
  try {
    const release = await prisma.releases.create({
      data: {
        title,
      },
    });
    return release;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};
