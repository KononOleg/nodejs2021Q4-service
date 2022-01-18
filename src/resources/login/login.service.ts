import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../common/config';
import StatusCode from '../../StatusCode/StatusCode';
import usersRepo from '../users/user.memory.repository';
import { IServiceReturn } from './interfaces/IServiceReturn';

/**
 * Returns all users
 * @returns {Promise<IServiceReturn[]> } all users
 */
const getToken = async (
  login: string,
  password: string
): Promise<IServiceReturn> => {
  const user = await usersRepo.getUserByLogin(login);
  if (!user) return { code: StatusCode.Forbidden };
  const match = await bcrypt.compare(password, user.password);
  if (!match) return { code: StatusCode.Forbidden };

  const token = jwt.sign({ userId: user.id, login }, config.JWT_SECRET_KEY);
  return { code: StatusCode.Ok, send: { token } };
};

export default { getToken };
