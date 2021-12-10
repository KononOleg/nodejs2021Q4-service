import { IUser } from './interfaces/IUser';

const users: IUser[] = [];

const getAll = (): IUser[] => users;

const getUser = (userId: string): IUser | undefined =>
  users.find((user: IUser) => user.id === userId);

const createUser = (newUser: IUser): void => {
  users.push(newUser);
};

const deleteUser = (user: IUser): void => {
  users.splice(users.indexOf(user), 1);
};
export default { getAll, getUser, createUser, deleteUser };
