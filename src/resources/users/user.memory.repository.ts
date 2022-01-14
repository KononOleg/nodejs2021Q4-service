import { getRepository } from 'typeorm';
import { INewUser } from './interfaces/INewUser';
import { IUser } from './interfaces/IUser';
import User from './user.model';

/**
 * Returns all users
 * @returns {Promise<IUser[]>} all users
 */
const getAll = (): Promise<IUser[]> => getRepository(User).find();

/**
 * Returns the user by Id
 * @param {string} userId user Id
 * @returns {Promise<IUser | undefined> } the user by Id
 */
const getUser = async (userId: string): Promise<IUser | undefined> =>
  getRepository(User).findOne(userId);

/**
 * Create a new user
 * @param {IUser} newUser new user
 * @returns {Promise<IUser>} createdUser return created user
 */
const createUser = async (newUser: INewUser): Promise<IUser> => {
  const createdUser = getRepository(User).create(newUser);
  await getRepository(User).save(createdUser);
  return createdUser;
};

/**
 * Delete user
 * @param {IUser} User user Id, which needs to be removed
 * @returns {Promise<void>}
 */
const deleteUser = async (user: IUser): Promise<void> => {
  await getRepository(User).delete(user.id);
};

/**
 * Update user
 * @param {IUser} User user, which needs to be update
 * @param {IUser} newUser new user body
 * @returns {Promise<IUser>} updateUser return updated user
 */
const updateUser = async (user: IUser, newUser: IUser): Promise<IUser> => {
  getRepository(User).merge(user, newUser);
  const updateUser = await getRepository(User).save(user);
  return updateUser;
};
export default { getAll, getUser, createUser, deleteUser, updateUser };
