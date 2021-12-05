const fastify = require('fastify')({ logger: true });
const userRouter = require('./resources/users/user.router');
const app = fastify;

app.register(userRouter, { prefix: '/users' });
module.exports = app;
