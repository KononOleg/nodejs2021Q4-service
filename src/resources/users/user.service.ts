import { v4 as uuid } from 'uuid';
import usersRepo from './user.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import StatusCode from '../../StatusCode/StatusCode';
import User from './user.model';
import { IUser } from './interfaces/IUser';
import { INewUser } from './interfaces/INewUser';
import { IServiceReturn } from './interfaces/IServiceReturn';
import { IResponseUser } from './interfaces/IResponseUser';

/**
 * Returns all users
 * @returns {IResponseUser[]} all users
 */
const getAll = (): IResponseUser[] => usersRepo.getAll().map(User.toResponse);

/**
 * Returns the user by Id
 * @param {string} userId user Id
 * @returns {IServiceReturn} Statuscode NotFound if user does not find, if user finds Statuscode Ok and user
 */
const getUser = (userId: string): IServiceReturn => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: User.toResponse(user) };
};

/**
 * Create new user
 * @param {INewUser} user new user
 * @returns {IServiceReturn} Statuscode Created and new user
 */
const createUser = (user: INewUser): IServiceReturn => {
  const newUser = {
    id: uuid(),
    ...user,
  };
  usersRepo.createUser(newUser);
  return { code: StatusCode.Created, send: User.toResponse(newUser) };
};

/**
 * Delete user
 * @param {string} userId user Id
 * @returns {IServiceReturn} Statuscode NotFound if user does not find, if user deleted Statuscode Ok
 */
const deleteUser = (userId: string): IServiceReturn => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  usersRepo.deleteUser(user);
  const tasks = tasksRepo.getUserTasks(userId);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].userId = null;
  }
  return { code: StatusCode.NoContent };
};
/**
 * Udpate user
 * @param {string} userId user Id
 * @param {INewUser} user new user
 * @returns {IServiceReturn} Statuscode NotFound if user does not find, if user updated Statuscode Ok and new user
 */
const udpateUser = (userId: string, newUser: IUser): IServiceReturn => {
  const user = usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  user.name = newUser.name;
  user.login = newUser.login;
  user.password = newUser.password;
  return { code: StatusCode.Ok, send: User.toResponse(user) };
};

export default { getAll, getUser, createUser, deleteUser, udpateUser };
