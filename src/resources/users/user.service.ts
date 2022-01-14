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
 * @returns {Promise<IServiceReturn[]> } all users
 */
const getAll = async (): Promise<IResponseUser[]> => {
  const allUser = await usersRepo.getAll();
  return allUser.map(User.toResponse);
};

/**
 * Returns the user by Id
 * @param {string} userId user Id
 * @returns {Promise<IServiceReturn> } Statuscode NotFound if user does not find, if user finds Statuscode Ok and user
 */
const getUser = async (userId: string): Promise<IServiceReturn> => {
  const user = await usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: User.toResponse(user) };
};

/**
 * Create new user
 * @param {INewUser} user new user
 * @returns {Promise<IServiceReturn> } Statuscode Created and new user
 */
const createUser = async (user: INewUser): Promise<IServiceReturn> => {
  const createdUser = await usersRepo.createUser(user);
  return { code: StatusCode.Created, send: User.toResponse(createdUser) };
};

/**
 * Delete user
 * @param {string} userId user Id
 * @returns {Promise<IServiceReturn> } Statuscode NotFound if user does not find, if user deleted Statuscode Ok
 */
const deleteUser = async (userId: string): Promise<IServiceReturn> => {
  const user = await usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  await usersRepo.deleteUser(user);
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
 * @returns {Promise<IServiceReturn> } Statuscode NotFound if user does not find, if user updated Statuscode Ok and new user
 */
const udpateUser = async (
  userId: string,
  newUser: IUser
): Promise<IServiceReturn> => {
  const user = await usersRepo.getUser(userId);
  if (!user) return { code: StatusCode.NotFound };
  const updateUser = await usersRepo.updateUser(user, newUser);
  return { code: StatusCode.Ok, send: User.toResponse(updateUser) };
};

export default { getAll, getUser, createUser, deleteUser, udpateUser };
