import jwt from 'jsonwebtoken';
import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { app } from '../app';
import config from '../common/config';

export default (
  _fastify: FastifyInstance,
  _opts: FastifyServerOptions,
  done: () => void
): void => {
  const allowedURLs = ['/login', '/doc', '/'];
  app.addHook('preHandler', (res, reply, next) => {
    if (allowedURLs.includes(res.url)) return next();
    try {
      const token = res.headers.authorization;
      if (!token)
        return reply
          .code(401)
          .header('Content-Type', 'application/json;')
          .send({ message: 'User is not authorized' });

      jwt.verify(token.split(' ')[1], config.JWT_SECRET_KEY);
      return next();
    } catch {
      return reply
        .code(401)
        .header('Content-Type', 'application/json;')
        .send({ message: 'User is not authorized' });
    }
  });
  done();
};
