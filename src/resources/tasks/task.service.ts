import { v4 as uuid } from 'uuid';
import tasksRepo from './task.memory.repository';
import StatusCode from '../../StatusCode/StatusCode';
import { IServiceReturn } from './interfaces/IServiceReturn';
import { INewTask } from './interfaces/INewTask';

/**
 * Returns all tasks
 * @param {string} boardId board Id
 * @returns {IServiceReturn} Statuscode NotFound if tasks does not find, if board finds Statuscode Ok and tasks
 */
const getAll = (boardId: string): IServiceReturn => {
  const tasks = tasksRepo.getAll(boardId);
  if (!tasks) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: tasks };
};

/**
 * Returns all tasks by Id
 * @param {string} taskId task Id
 * @returns {IServiceReturn} Statuscode NotFound if tasks does not find, if board finds Statuscode Ok and tasks
 */
const getTask = (taskId: string): IServiceReturn => {
  const task = tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: task };
};

/**
 * Create new task
 * @param {string} boardId board Id
 * @param {INewTask} task new task
 * @returns {IServiceReturn} Statuscode Created and new task
 */
const createTask = (boardId: string, task: INewTask): IServiceReturn => {
  const newTask = {
    id: uuid(),
    ...task,
    boardId,
  };
  tasksRepo.createTask(newTask);
  return { code: StatusCode.Created, send: newTask };
};

/**
 * Delete task
 * @param {string} taskId task Id
 * @returns {IServiceReturn} Statuscode NotFound if task does not find, if task deleted Statuscode Ok
 */
const deleteTask = (taskId: string): IServiceReturn => {
  const task = tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };

  tasksRepo.deleteTask(task);
  return { code: StatusCode.NoContent };
};

/**
 * Udpate task
 * @param {string} taskId tak Id
 * @param {INewBoard} newTask new task
 * @returns {IServiceReturn} Statuscode NotFound if task does not find, if task updated Statuscode Ok and new task
 */
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
