import  fastify  from 'fastify'
import userRouter  from './resources/users/user.router';
import boardRouter  from './resources/board/board.router';
import taskRouter  from './resources/tasks/task.router';

export const app = fastify();

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards/:boardId/tasks' });
