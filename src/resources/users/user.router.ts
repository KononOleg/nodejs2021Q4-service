import { FastifyReply, FastifyInstance, FastifyServerOptions } from 'fastify';
import { IParams } from './interfaces/IParams';
import usersService from './user.service';

export default (
  fastify: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
): void => {
  fastify.get('/', async (request, reply: FastifyReply) => {
    const users = usersService.getAll();
    reply.header('Content-Type', 'application/json;').send(users);
  });

  fastify.get<IParams>('/:userId', async (request, reply: FastifyReply) => {
    const { userId } = request.params;
    const { code, send } = usersService.getUser(userId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.post<IParams>('/', async (request, reply: FastifyReply) => {
    const user = request.body;
    const { code, send } = usersService.createUser(user);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.delete<IParams>('/:userId', async (request, reply: FastifyReply) => {
    const { userId } = request.params;
    const { code } = await usersService.deleteUser(userId);
    reply.code(code).header('Content-Type', 'application/json;').send();
  });
  fastify.put<IParams>('/:userId', async (request, reply: FastifyReply) => {
    const { userId } = request.params;
    const newUser = request.body;
    const { code, send } = usersService.udpateUser(userId, newUser);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });
  done();
};
