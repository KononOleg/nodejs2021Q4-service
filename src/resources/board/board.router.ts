import boardsService  from './board.service';

export default (fastify:any, opts:any, done:any) => {
  fastify.get('/', async (request:any, reply:any) => {
    const boards = await boardsService.getAll();
    reply.header('Content-Type', 'application/json;').send(boards);
  });

  fastify.get('/:boardId', async (request:any, reply:any) => {
    const { boardId } = request.params;
    const { code, send } = await boardsService.getBoard(boardId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.post('/', async (request:any, reply:any) => {
    const board = request.body;
    const { code, newBoard } = await boardsService.createBoard(board);
    reply.code(code).header('Content-Type', 'application/json;').send(newBoard);
  });

  fastify.delete('/:boardId', async (request:any, reply:any) => {
    const { boardId } = request.params;
    const { code } = await boardsService.deleteBoard(boardId);
    reply.code(code).header('Content-Type', 'application/json;');
  });
  fastify.put('/:boardId', async (request:any, reply:any) => {
    const { boardId } = request.params;
    const newBoard = request.body;
    const { code, updateBoard } = await boardsService.udpateBoard(
      boardId,
      newBoard
    );
    reply
      .code(code)
      .header('Content-Type', 'application/json;')
      .send(updateBoard);
  });
  done();
};
