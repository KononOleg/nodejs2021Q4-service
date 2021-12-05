const boardsService = require('./board.service');

module.exports = (fastify, opts, done) => {
  fastify.get('/', async (request, reply) => {
    const boards = await boardsService.getAll();
    reply.header('Content-Type', 'application/json;').send(boards);
  });

  fastify.get('/:boardId', async (request, reply) => {
    const { boardId } = request.params;
    const { code, send } = await boardsService.getBoard(boardId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.post('/', async (request, reply) => {
    const board = request.body;
    const { code, newBoard } = await boardsService.createBoard(board);
    reply.code(code).header('Content-Type', 'application/json;').send(newBoard);
  });

  fastify.delete('/:boardId', async (request, reply) => {
    const { boardId } = request.params;
    const { code } = await boardsService.deleteBoard(boardId);
    reply.code(code).header('Content-Type', 'application/json;');
  });
  fastify.put('/:boardId', async (request, reply) => {
    const { boardId } = request.params;
    const newBoard = request.body;
    const { code, udpateBoard } = await boardsService.udpateBoard(
      boardId,
      newBoard
    );
    reply
      .code(code)
      .header('Content-Type', 'application/json;')
      .send(udpateBoard);
  });
  done();
};
