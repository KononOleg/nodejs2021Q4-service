import { v4 as uuid } from 'uuid';
import usersRepo from './user.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import StatusCode from '../../StatusCode/StatusCode';
import User from './user.model';
import { IUser } from './interfaces/IUser';
import { INewUser } from './interfaces/INewUser';
import { IServiceReturn } from './interfaces/IServiceReturn';
import { IResponseUser } from './interfaces/IResponseUser';

const getAll = (): IResponseUser[] => usersRepo.getAll().map(User.toResponse);

const getUser = (userId: string): IServiceReturn => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: User.toResponse(user) };
};
const createUser = (user: INewUser): IServiceReturn => {
  const newUser = {
    id: uuid(),
    ...user,
  };
  usersRepo.createUser(newUser);
  return { code: StatusCode.Created, send: User.toResponse(newUser) };
};

const deleteUser = async (userId: string): Promise<IServiceReturn> => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  usersRepo.deleteUser(user);
  const tasks = await tasksRepo.getUserTasks(userId);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].userId = null;
  }
  return { code: StatusCode.NoContent };
};

const udpateUser = (userId: string, newUser: IUser): IServiceReturn => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  user.name = newUser.name;
  user.login = newUser.login;
  user.password = newUser.password;
  return { code: StatusCode.Ok, send: User.toResponse(user) };
};

export default { getAll, getUser, createUser, deleteUser, udpateUser };
