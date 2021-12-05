const fastify = require('fastify')({ logger: true });
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/board/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = fastify;

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards/:boardId/tasks' });
module.exports = app;
