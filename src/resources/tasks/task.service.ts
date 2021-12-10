import { v4 as uuid } from 'uuid';
import tasksRepo from './task.memory.repository';
import StatusCode from '../../StatusCode/StatusCode';
import { IServiceReturn } from './interfaces/IServiceReturn';
import { INewTask } from './interfaces/INewTask';

const getAll = (boardId: string): IServiceReturn => {
  const tasks = tasksRepo.getAll(boardId);
  if (!tasks) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: tasks };
};

const getTask = (boardId: string, taskId: string): IServiceReturn => {
  const task = tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: task };
};
const createTask = (boardId: string, task: INewTask): IServiceReturn => {
  const newTask = {
    id: uuid(),
    ...task,
    boardId,
  };
  tasksRepo.createTask(newTask);
  return { code: StatusCode.Created, send: newTask };
};

const deleteTask = (taskId: string): IServiceReturn => {
  const task = tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };

  tasksRepo.deleteTask(task);
  return { code: StatusCode.NoContent };
};

const udpateTask = (taskId: string, newTask: INewTask): IServiceReturn => {
  let task = tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };
  task = Object.assign(task, newTask);
  return { code: StatusCode.Ok, send: task };
};
export default {
  getAll,
  getTask,
  createTask,
  deleteTask,
  udpateTask,
};
