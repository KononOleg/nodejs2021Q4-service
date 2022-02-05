import jwt from 'jsonwebtoken';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import config from '../common/config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const res = context.switchToHttp().getRequest();
    const {authorization} = res.headers;
    try {
      const token = authorization.split(' ')[1];
      const bearer = authorization.split(' ')[0];
      if (bearer !== 'Bearer' || !token)
        throw new HttpException(
          `The user is unauthorized`,
          HttpStatus.UNAUTHORIZED
        );

      jwt.verify(token, config.JWT_SECRET_KEY);
      return true;
    } catch {
      throw new HttpException(
        `The user is unauthorized`,
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
