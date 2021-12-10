import { FastifyReply, FastifyInstance, FastifyServerOptions } from 'fastify';
import { IParams } from './interfaces/IParams';
import tasksService from './task.service';

export default (
  fastify: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
): void => {
  fastify.get<IParams>('/', async (request, reply: FastifyReply) => {
    const { boardId } = request.params;
    const { code, send } = await tasksService.getAll(boardId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.get<IParams>('/:taskId', async (request, reply: FastifyReply) => {
    const { boardId, taskId } = request.params;
    const { code, send } = await tasksService.getTask(boardId, taskId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.post<IParams>('/', async (request, reply: FastifyReply) => {
    const { boardId } = request.params;
    const task = request.body;
    const { code, send } = tasksService.createTask(boardId, task);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.delete<IParams>('/:taskId', async (request, reply: FastifyReply) => {
    const { taskId } = request.params;
    const { code } = await tasksService.deleteTask(taskId);
    reply.code(code).header('Content-Type', 'application/json;').send();
  });
  fastify.put<IParams>('/:taskId', async (request, reply: FastifyReply) => {
    const { taskId } = request.params;
    const newTask = request.body;
    const { code, send } = await tasksService.udpateTask(taskId, newTask);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });
  done();
};
