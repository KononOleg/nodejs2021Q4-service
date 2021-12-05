const tasks = [];

const getAll = (boardId) => tasks.filter((task) => task.boardId === boardId);
const getUserTasks = (userId) => tasks.filter((task) => task.userId === userId);
const getTask = (taskId) => tasks.find((task) => task.id === taskId);

const createTask = (newTask) => {
  tasks.push(newTask);
};

const deleteTask = (task) => {
  tasks.splice(tasks.indexOf(task), 1);
};
module.exports = { getAll, getTask, getUserTasks, createTask, deleteTask };
