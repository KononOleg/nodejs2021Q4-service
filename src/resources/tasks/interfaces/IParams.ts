import { INewTask } from './INewTask';

export interface IParams {
  Params: { boardId: string; taskId: string };
  Body: INewTask;
}
