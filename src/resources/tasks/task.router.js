const tasksService = require('./task.service');

module.exports = (fastify, opts, done) => {
  fastify.get('/', async (request, reply) => {
    const { boardId } = request.params;
    const { code, send } = await tasksService.getAll(boardId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.get('/:taskId', async (request, reply) => {
    const { boardId, taskId } = request.params;
    const { code, send } = await tasksService.getTask(boardId, taskId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.post('/', async (request, reply) => {
    const { boardId } = request.params;
    const task = request.body;
    const { code, send } = await tasksService.createTask(boardId, task);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.delete('/:taskId', async (request, reply) => {
    const { taskId } = request.params;
    const { code } = await tasksService.deleteTask(taskId);
    reply.code(code).header('Content-Type', 'application/json;').send();
  });
  fastify.put('/:taskId', async (request, reply) => {
    const { taskId } = request.params;
    const newTask = request.body;
    const { code, send } = await tasksService.udpateTask(taskId, newTask);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });
  done();
};
