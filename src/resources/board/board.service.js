const { v4: uuidv4 } = require('uuid');
const boardsRepo = require('./board.memory.repository');
/* const tasksRepo = require('../tasks/task.memory.repository'); */
const StatusCode = require('../../StatusCode/StatusCode');

const getAll = () => boardsRepo.getAll();

const getBoard = (boardId) => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: board };
};
const createBoard = async (board) => {
  const newBoard = {
    id: uuidv4(),
    title: board.title,
    columns: board.columns.map((column) => ({
      id: uuidv4(),
      title: column.title,
      order: column.order,
    })),
  };
  boardsRepo.createBoard(newBoard);
  return { code: StatusCode.Created, newBoard };
};

const deleteBoard = async (boardId) => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  await boardsRepo.deleteBoard(board);
  /*   const tasks = await tasksRepo.getAll(boardId);
  await tasks.map((task) => tasksRepo.deleteTask(task)); */
  return { code: StatusCode.NoContent };
};

const udpateBoard = async (boardId, newBoard) => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  board.title = newBoard.title;
  board.columns = newBoard.columns;
  return { code: StatusCode.Ok, updateBoard: board };
};

module.exports = { getAll, getBoard, createBoard, deleteBoard, udpateBoard };
