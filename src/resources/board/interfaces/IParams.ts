import { IBoard } from './IBoard';

export interface IParams {
  Params: { boardId: string };
  Body: IBoard;
}
