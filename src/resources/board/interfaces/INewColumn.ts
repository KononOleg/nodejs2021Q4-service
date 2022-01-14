import { IBoard } from './IBoard';

export interface INewColumn {
  title: string;
  order: number;
  board: IBoard;
}
