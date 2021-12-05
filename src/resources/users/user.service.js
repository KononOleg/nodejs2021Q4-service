const { v4: uuidv4 } = require('uuid');
const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const StatusCode = require('../../StatusCode/StatusCode');
const User = require('./user.model');

const getAll = () => usersRepo.getAll().map(User.toResponse);

const getUser = (userId) => {
  const user = usersRepo.getUser(userId);

  if (!user) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: User.toResponse(user) };
};
const createUser = async (user) => {
  const newUser = {
    id: uuidv4(),
    ...user,
  };
  usersRepo.createUser(newUser);
  return { code: StatusCode.Created, newUser: User.toResponse(newUser) };
};

const deleteUser = async (userId) => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  usersRepo.deleteUser(user);
  const tasks = await tasksRepo.getUserTasks(userId);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].userId = null;
  }
  return { code: StatusCode.NoContent };
};

const udpateUser = async (userId, newUser) => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  user.name = newUser.name;
  user.login = newUser.login;
  user.password = newUser.password;
  return { code: StatusCode.Ok, updateUser: User.toResponse(user) };
};

module.exports = { getAll, getUser, createUser, deleteUser, udpateUser };
