import { IBoard } from './IBoard';

export interface IServiceReturn {
  code: number;
  send?: IBoard | undefined;
}
