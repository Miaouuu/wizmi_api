import { FastifyRequest } from 'fastify';
import jsonwebtoken from 'jsonwebtoken';

function jwt(token: string, secret: string): Promise<number> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded?.id);
    });
  });
}

const verifToken = async (req: FastifyRequest) => {
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

export default verifToken;
