const tasks:any = [];

const getAll = (boardId:any) => tasks.filter((task:any) => task.boardId === boardId);
const getUserTasks = (userId:any) => tasks.filter((task:any) => task.userId === userId);
const getTask = (taskId:any) => tasks.find((task:any) => task.id === taskId);

const createTask = (newTask:any) => {
  tasks.push(newTask);
};

const deleteTask = (task:any) => {
  tasks.splice(tasks.indexOf(task), 1);
};
export default { getAll, getTask, getUserTasks, createTask, deleteTask };
