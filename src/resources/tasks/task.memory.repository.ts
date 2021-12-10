import { ITask } from './interfaces/ITask';

const tasks: ITask[] = [];

const getAll = (boardId: string): ITask[] =>
  tasks.filter((task: ITask) => task.boardId === boardId);
const getUserTasks = (userId: string): ITask[] =>
  tasks.filter((task: ITask) => task.userId === userId);
const getTask = (taskId: string): ITask | undefined =>
  tasks.find((task: ITask) => task.id === taskId);

const createTask = (newTask: ITask): void => {
  tasks.push(newTask);
};

const deleteTask = (task: ITask): void => {
  tasks.splice(tasks.indexOf(task), 1);
};
export default { getAll, getTask, getUserTasks, createTask, deleteTask };
