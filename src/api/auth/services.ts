import { FastifyRequest } from 'fastify';
import jsonwebtoken from 'jsonwebtoken';
import { getUserByEmail, getUserById, getUserByUsername } from '../users/services';

const { JWT_SECRET = 'meow' } = process.env;

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
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error('No token provided');
  }
  const [, token] = authorization.split(' ');
  if (!token) {
    throw new Error('No token provided');
  }
  try {
    const id = await jwt(token, JWT_SECRET);
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

export const isAdmin = async (req: FastifyRequest) => {
  const { id } = req.user;
  const user = await getUserById(id);
  if (!user) {
    throw new Error('Account doesn\'t exist !');
  }
  if (!user.roles.includes('ADMIN')) {
    throw new Error('Unauthorized !');
  }
};

export const generateToken = (id: number) => jsonwebtoken.sign({ id }, JWT_SECRET);

export const isEmail = (email: string): boolean => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase());

export const existEmail = async (email: string): Promise<boolean> => {
  try {
    const user = await getUserByEmail(email);
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
    const user = await getUserByUsername(username);
    if (!user) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
