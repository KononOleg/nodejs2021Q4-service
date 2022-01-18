import { FastifyReply, FastifyInstance, FastifyServerOptions } from 'fastify';
import { IParams } from './interfaces/IParams';
import loginService from './login.service';

export default (
  fastify: FastifyInstance,
  _opts: FastifyServerOptions,
  done: () => void
): void => {
  fastify.post<IParams>('/', async (request, reply: FastifyReply) => {
    const { login, password } = request.body;
    const { code, send } = await loginService.getToken(login, password);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });
  done();
};
