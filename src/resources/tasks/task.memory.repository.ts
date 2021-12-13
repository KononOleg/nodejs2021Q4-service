import { ITask } from './interfaces/ITask';

const tasks: ITask[] = [];

/**
 * Returns all tasks by boardId
 * @param {string} boardId board Id
 * @returns {ITask[]} all tasks
 */
const getAll = (boardId: string): ITask[] =>
  tasks.filter((task: ITask) => task.boardId === boardId);

/**
 * Returns all tasks by userId
 * @param {string} userId user Id
 * @returns {ITask[]} all tasks by userId
 */
const getUserTasks = (userId: string): ITask[] =>
  tasks.filter((task: ITask) => task.userId === userId);
/**
 * Returns all tasks by taskId
 * @param {string} taskId user Id
 * @returns {ITask | undefined } all tasks by taskId
 */
const getTask = (taskId: string): ITask | undefined =>
  tasks.find((task: ITask) => task.id === taskId);

/**
 * Create a new task
 * @param {ITask} newTask new task
 * @returns {void}
 */
const createTask = (newTask: ITask): void => {
  tasks.push(newTask);
};

/**
 * Delete task
 * @param {ITask} task task, which needs to be removed
 * @returns {void}
 */
const deleteTask = (task: ITask): void => {
  tasks.splice(tasks.indexOf(task), 1);
};
export default { getAll, getTask, getUserTasks, createTask, deleteTask };
