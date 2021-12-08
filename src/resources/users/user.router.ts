import usersService  from './user.service';

export default (fastify:any, opts:any, done:any) => {
  fastify.get('/', async (request:any, reply:any) => {
    const users = await usersService.getAll();
    reply.header('Content-Type', 'application/json;').send(users);
  });

  fastify.get('/:userId', async (request:any, reply:any) => {
    const { userId } = request.params;
    const { code, send } = await usersService.getUser(userId);
    reply.code(code).header('Content-Type', 'application/json;').send(send);
  });

  fastify.post('/', async (request:any, reply:any) => {
    const user = request.body;
    const { code, newUser } = await usersService.createUser(user);
    reply.code(code).header('Content-Type', 'application/json;').send(newUser);
  });

  fastify.delete('/:userId', async (request:any, reply:any) => {
    const { userId } = request.params;
    const { code } = await usersService.deleteUser(userId);
    reply.code(code).header('Content-Type', 'application/json;').send();
  });
  fastify.put('/:userId', async (request:any, reply:any) => {
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
