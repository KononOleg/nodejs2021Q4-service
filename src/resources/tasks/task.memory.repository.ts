import { getRepository } from 'typeorm';
import { INewTask } from './interfaces/INewTask';
import { ITask } from './interfaces/ITask';
import Task from './task.model';

/**
 * Returns all tasks by boardId
 * @param {string} boardId board Id
 * @returns {ITask[]} all tasks
 */
const getAll = async (boardId: string): Promise<ITask[]> =>
  getRepository(Task).find({
    where: { boardId },
  });
/**
 * Returns all tasks by userId
 * @param {string} userId user Id
 * @returns {ITask[]} all tasks by userId
 */
const getUserTasks = async (userId: string): Promise<ITask[]> =>
  getRepository(Task).find({
    where: { userId },
  });
/**
 * Returns all tasks by taskId
 * @param {string} taskId user Id
 * @returns {ITask | undefined } all tasks by taskId
 */
const getTask = async (taskId: string): Promise<ITask | undefined> =>
  getRepository(Task).findOne(taskId);

/**
 * Create a new task
 * @param {string} boardId id board
 * @param {INewTask} newTask new task
 * @returns {ITask} createdTask
 */
const createTask = async (
  boardId: string,
  newtask: INewTask
): Promise<ITask> => {
  const createdTask = getRepository(Task).create(newtask);
  createdTask.boardId = boardId;
  await getRepository(Task).save(createdTask);
  return createdTask;
};

/**
 * Delete task
 * @param {ITask} task task, which needs to be removed
 * @returns {void}
 */
const deleteTask = async (task: ITask): Promise<void> => {
  await getRepository(Task).delete(task.id);
};

/**
 * Update task
 * @param {ITask} task task, which needs to be update
 * @param {ITask} newTask new task body
 * @returns {Promise<ITask>} updatedTask return updated task
 */
const updateTask = async (task: ITask, newTask: INewTask): Promise<ITask> => {
  getRepository(Task).merge(task as Task, newTask);
  const updatedTask = await getRepository(Task).save(task);
  return updatedTask;
};
export default {
  getAll,
  getTask,
  getUserTasks,
  createTask,
  deleteTask,
  updateTask,
};
