import { FastifyReply, FastifyInstance, FastifyServerOptions } from 'fastify';
import boardsService from './board.service';
import { IParams } from './interfaces/IParams';

export default (
  fastify: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
): void => {
  fastify.get('/', async (request, reply: FastifyReply) => {
    const boards = await boardsService.getAll();
    reply.header('Content-Type', 'application/json;').send(boards);
  });

  fastify.get<IParams>('/:boardId', async (request, reply: FastifyReply) => {
    const { boardId } = request.params;
    const { code, send } = await boardsService.getBoard(boardId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.post<IParams>('/', async (request, reply: FastifyReply) => {
    const board = request.body;
    const { code, send } = await boardsService.createBoard(board);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.delete<IParams>('/:boardId', async (request, reply: FastifyReply) => {
    const { boardId } = request.params;
    const { code } = await boardsService.deleteBoard(boardId);
    reply.code(code).header('Content-Type', 'application/json;');
  });
  fastify.put<IParams>('/:boardId', async (request, reply: FastifyReply) => {
    const { boardId } = request.params;
    const newBoard = request.body;
    const { code, send } = await boardsService.udpateBoard(boardId, newBoard);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });
  done();
};
