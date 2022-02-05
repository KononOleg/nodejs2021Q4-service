import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import config from '../../common/config';
import { UsersService } from '../users/users.service';
import { IToken } from './interfaces/IToken';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}

  async login(login: string, password: string): Promise<IToken> {
    const user = await this.usersService.findOneByLogin(login);
    if (!user)
      throw new HttpException(
        `Username or password is incorrect`,
        HttpStatus.FORBIDDEN
      );
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      throw new HttpException(
        `Username or password is incorrect`,
        HttpStatus.FORBIDDEN
      );

    const token = jwt.sign({ userId: user.id, login }, config.JWT_SECRET_KEY);
    return { token };
  }
}
