const usersService = require('./user.service');

module.exports = (fastify, opts, done) => {
  fastify.get('/', async (request, reply) => {
    const users = await usersService.getAll();
    reply.header('Content-Type', 'application/json;').send(users);
  });

  fastify.get('/:userId', async (request, reply) => {
    const { userId } = request.params;
    const { code, send } = await usersService.getUser(userId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.post('/', async (request, reply) => {
    const user = request.body;
    const { code, newUser } = await usersService.createUser(user);
    reply.code(code).header('Content-Type', 'application/json;').send(newUser);
  });

  fastify.delete('/:userId', async (request, reply) => {
    const { userId } = request.params;
    const { code } = await usersService.deleteUser(userId);
    reply.code(code).header('Content-Type', 'application/json;').send();
  });
  fastify.put('/:userId', async (request, reply) => {
    const { userId } = request.params;
    const newUser = request.body;
    const { code, updateUser } = await usersService.udpateUser(userId, newUser);
    reply
      .code(code)
      .header('Content-Type', 'application/json;')
      .send(updateUser);
  });
  done();
};
