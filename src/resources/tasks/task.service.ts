import tasksRepo  from './task.memory.repository';
import StatusCode  from '../../StatusCode/StatusCode';

const { v4: uuidv4 } = require('uuid');

const getAll = async (boardId:any) => {
  const tasks = await tasksRepo.getAll(boardId);
  if (!tasks) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: tasks };
};

const getTask = (boardId:any, taskId:any) => {
  const task = tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: task };
};
const createTask = async (boardId:any, task:any) => {
  const newTask = {
    id: uuidv4(),
    ...task,
    boardId,
  };
  await tasksRepo.createTask(newTask);
  return { code: StatusCode.Created, send: newTask };
};

const deleteTask = async (taskId:any) => {
  const task = await tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };

  tasksRepo.deleteTask(task);
  return { code: StatusCode.NoContent };
};

const udpateTask = async (taskId:any, newTask:any) => {
  let task = await tasksRepo.getTask(taskId);
  if (!task) return { code: StatusCode.NotFound };
  task = Object.assign(task, newTask);
  return { code: StatusCode.Ok, send: task };
};
module.exports = {
  getAll,
  getTask,
  createTask,
  deleteTask,
  udpateTask,
};
