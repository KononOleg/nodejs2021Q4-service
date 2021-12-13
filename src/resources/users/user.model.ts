import { v4 as uuid } from 'uuid';
import { IResponseUser } from './interfaces/IResponseUser';
import { IUser } from './interfaces/IUser';

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * return data user without password
   * @param {IUser} userId user Id
   * @returns {IResponseUser} data user without password
   */
  static toResponse(user: IUser): IResponseUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
