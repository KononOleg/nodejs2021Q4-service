const { v4: uuidv4 } = require('uuid');
import boardsRepo  from './board.memory.repository';
import tasksRepo  from '../tasks/task.memory.repository';
import StatusCode  from '../../StatusCode/StatusCode';

const getAll = () => boardsRepo.getAll();

const getBoard = (boardId:any) => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: board };
};
const createBoard = async (board:any) => {
  const newBoard = {
    id: uuidv4(),
    title: board.title,
    columns: board.columns.map((column:any) => ({
      id: uuidv4(),
      title: column.title,
      order: column.order,
    })),
  };
  boardsRepo.createBoard(newBoard);
  return { code: StatusCode.Created, newBoard };
};

const deleteBoard = async (boardId:any) => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  await boardsRepo.deleteBoard(board);
  const tasks = await tasksRepo.getAll(boardId);
  await tasks.map((task:any) => tasksRepo.deleteTask(task));
  return { code: StatusCode.NoContent };
};

const udpateBoard = async (boardId:any, newBoard:any) => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound, updateBoard: undefined  };
  board.title = newBoard.title;
  board.columns = newBoard.columns;
  return { code: StatusCode.Ok, updateBoard: board };
};

export default { getAll, getBoard, createBoard, deleteBoard, udpateBoard };
