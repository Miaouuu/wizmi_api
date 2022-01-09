import { ErrorType, IError } from 'wizmi';
import prisma from '../../prisma';

export const getUserById = async (id: number) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id,
      },
    });
    return user;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    return user;
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};

export const createUser = async (email: string, username: string, password: string) => {
  try {
    await prisma.users.create({
      data: {
        email,
        username,
        password,
        roles: ['USER'],
      },
    });
  } catch {
    throw { type: ErrorType.INTERNAL_SERVER_ERROR, key: 'server_error' } as IError;
  }
};
