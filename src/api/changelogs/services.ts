import { CreateChangelogInput, ErrorType, IError } from 'wizmi';
import prisma from '../../prisma';

export const createChangelog = async (changelog: CreateChangelogInput) => {
  const {
    title, description, author, project,
  } = changelog;
  try {
    await prisma.changelogs.create({
      data: {
        title,
        description,
        author,
        project,
      },
    });
  } catch (e) {
    console.error(e);
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const assignChangelogsToRelease = async (releaseId: number) => {
  try {
    await prisma.changelogs.updateMany({
      where: {
        releaseId: undefined,
      },
      data: {
        releaseId,
      },
    });
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};
