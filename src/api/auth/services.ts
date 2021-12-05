import { FastifyRequest } from 'fastify';
import jsonwebtoken from 'jsonwebtoken';
import prisma from '../../prisma';

function jwt(token: string, secret: string): Promise<{ id: number }> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded?.id);
    });
  });
}

export const verifToken = async (req: FastifyRequest) => {
  let { token } = req.headers;
  if (!token) {
    throw new Error('No token provided');
  }
  token = token.toString();
  try {
    const id = await jwt(token, 'user');
    if (typeof id !== 'number') {
      throw new Error('Unauthorized');
    }
    req.user = {
      id,
    };
  } catch {
    throw new Error('Unauthorized');
  }
};

export const generateToken = (id: number) => jsonwebtoken.sign({ id }, 'user');

export const isEmail = (email: string): boolean => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase());

export const existEmail = async (email: string): Promise<boolean> => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export const existUsername = async (username: string): Promise<boolean> => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
