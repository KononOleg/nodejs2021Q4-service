export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId?: string;
  boardId: string;
  columnId: string;
}
