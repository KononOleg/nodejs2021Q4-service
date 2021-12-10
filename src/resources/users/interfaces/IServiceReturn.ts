import { IResponseUser } from './IResponseUser';
import { IUser } from './IUser';

export interface IServiceReturn {
  code: number;
  send?: IUser | IResponseUser | undefined;
}
