import tasksRepo from './task.memory.repository';
import StatusCode from '../../StatusCode/StatusCode';
import { IServiceReturn } from './interfaces/IServiceReturn';
import { INewTask } from './interfaces/INewTask';

/**
 * Returns all tasks
 * @param {string} boardId board Id
 * @returns {IServiceReturn} Statuscode NotFound if tasks does not find, if board finds Statuscode Ok and tasks
 */
const getAll = async (boardId: string): Promise<IServiceReturn> => {
  const tasks = await tasksRepo.getAll(boardId);
  if (!tasks) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: tasks };
};

/**
 * Returns all tasks by Id
 * @param {string} taskId task Id
 * @returns {IServiceReturn} Statuscode NotFound if tasks does not find, if board finds Statuscode Ok and tasks
 */
const getTask = async (taskId: string): Promise<IServiceReturn> => {
  const task = await tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: task };
};

/**
 * Create new task
 * @param {string} boardId board Id
 * @param {INewTask} task new task
 * @returns {IServiceReturn} Statuscode Created and new task
 */
const createTask = async (
  boardId: string,
  task: INewTask
): Promise<IServiceReturn> => {
  const newTask = await tasksRepo.createTask(boardId, task);
  return { code: StatusCode.Created, send: newTask };
};

/**
 * Delete task
 * @param {string} taskId task Id
 * @returns {IServiceReturn} Statuscode NotFound if task does not find, if task deleted Statuscode Ok
 */
const deleteTask = async (taskId: string): Promise<IServiceReturn> => {
  const task = await tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };
  await tasksRepo.deleteTask(task);
  return { code: StatusCode.NoContent };
};

/**
 * Udpate task
 * @param {string} taskId tak Id
 * @param {INewBoard} newTask new task
 * @returns {IServiceReturn} Statuscode NotFound if task does not find, if task updated Statuscode Ok and new task
 */
const udpateTask = async (
  taskId: string,
  newTask: INewTask
): Promise<IServiceReturn> => {
  const task = await tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };
  const updatedTask = await tasksRepo.updateTask(task, newTask);
  return { code: StatusCode.Ok, send: updatedTask };
};
export default {
  getAll,
  getTask,
  createTask,
  deleteTask,
  udpateTask,
};
