import { ITask } from './ITask';

export interface IServiceReturn {
  code: number;
  send?: ITask[] | ITask | undefined;
}
