import usersRepo  from './user.memory.repository';
import tasksRepo  from '../tasks/task.memory.repository';
import StatusCode  from '../../StatusCode/StatusCode';
import User  from './user.model';

const { v4: uuidv4 } = require('uuid');

const getAll = () => usersRepo.getAll().map(User.toResponse);

const getUser = (userId:any) => {
  const user = usersRepo.getUser(userId);

  if (!user) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: User.toResponse(user) };
};
const createUser = async (user:any) => {
  const newUser = {
    id: uuidv4(),
    ...user,
  };
  usersRepo.createUser(newUser);
  return { code: StatusCode.Created, newUser: User.toResponse(newUser) };
};

const deleteUser = async (userId:any) => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  usersRepo.deleteUser(user);
  const tasks = await tasksRepo.getUserTasks(userId);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].userId = null;
  }
  return { code: StatusCode.NoContent };
};

const udpateUser = async (userId:any, newUser:any) => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  user.name = newUser.name;
  user.login = newUser.login;
  user.password = newUser.password;
  return { code: StatusCode.Ok, updateUser: User.toResponse(user) };
};

export default { getAll, getUser, createUser, deleteUser, udpateUser };
