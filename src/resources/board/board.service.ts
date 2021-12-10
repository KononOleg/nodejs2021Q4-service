import { v4 as uuid } from 'uuid';
import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import StatusCode from '../../StatusCode/StatusCode';
import { IColumn } from './interfaces/IColumn';
import { IBoard } from './interfaces/IBoard';
import { INewBoard } from './interfaces/INewBoard';
import { IServiceReturn } from './interfaces/IServiceReturn';


const getAll = (): IBoard[] => boardsRepo.getAll();

const getBoard = (boardId: string): IServiceReturn => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: board };
};
const createBoard = (board: IBoard): IServiceReturn => {
  const newBoard = {
    id: uuid(),
    title: board.title,
    columns: board.columns.map((column: IColumn) => ({
      id: uuid(),
      title: column.title,
      order: column.order,
    })),
  };
  boardsRepo.createBoard(newBoard);
  return { code: StatusCode.Created, send: newBoard };
};

const deleteBoard = async (boardId: string): Promise<IServiceReturn> => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  boardsRepo.deleteBoard(board);
  const tasks = await tasksRepo.getAll(boardId);
  await tasks.map((task: any) => tasksRepo.deleteTask(task));
  return { code: StatusCode.NoContent };
};

const udpateBoard = (boardId: string, newBoard: INewBoard): IServiceReturn => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  board.title = newBoard.title;
  board.columns = newBoard.columns;
  return { code: StatusCode.Ok, send: board };
};

export default { getAll, getBoard, createBoard, deleteBoard, udpateBoard };
