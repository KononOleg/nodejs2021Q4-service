import { IUser } from './interfaces/IUser';

const users: IUser[] = [];

/**
 * Returns all users
 * @returns {IUser[]} all users
 */
const getAll = (): IUser[] => users;

/**
 * Returns the user by Id
 * @param {string} userId user Id
 * @returns {IUser | undefined} the user by Id
 */
const getUser = (userId: string): IUser | undefined =>
  users.find((user: IUser) => user.id === userId);

/**
 * Create a new user
 * @param {IUser} newUser user Id
 * @returns {void}
 */
const createUser = (newUser: IUser): void => {
  users.push(newUser);
};

/**
 * Delete user
 * @param {IUser} User user Id
 * @returns {void}
 */
const deleteUser = (user: IUser): void => {
  users.splice(users.indexOf(user), 1);
};
export default { getAll, getUser, createUser, deleteUser };
