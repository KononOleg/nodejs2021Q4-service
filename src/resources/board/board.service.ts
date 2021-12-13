import { v4 as uuid } from 'uuid';
import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import StatusCode from '../../StatusCode/StatusCode';
import { IColumn } from './interfaces/IColumn';
import { IBoard } from './interfaces/IBoard';
import { INewBoard } from './interfaces/INewBoard';
import { IServiceReturn } from './interfaces/IServiceReturn';
import { ITask } from '../tasks/interfaces/ITask';

/**
 * Returns all board
 * @returns {IBoard[]} all users
 */
const getAll = (): IBoard[] => boardsRepo.getAll();

/**
 * Returns the board by Id
 * @param {string} boardId user Id
 * @returns {IServiceReturn} Statuscode NotFound if board does not find, if board finds Statuscode Ok and board
 */
const getBoard = (boardId: string): IServiceReturn => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: board };
};

/**
 * Create new board
 * @param {IBoard} board new board
 * @returns {IServiceReturn} Statuscode Created and new board
 */
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

/**
 * Delete board
 * @param {string} boardId board Id
 * @returns {IServiceReturn} Statuscode NotFound if board does not find, if board deleted Statuscode Ok
 */
const deleteBoard = (boardId: string): IServiceReturn => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  boardsRepo.deleteBoard(board);
  const tasks = tasksRepo.getAll(boardId);
  tasks.map((task: ITask) => tasksRepo.deleteTask(task));
  return { code: StatusCode.NoContent };
};

/**
 * Udpate board
 * @param {string} boardId board Id
 * @param {INewBoard} newBoard new board
 * @returns {IServiceReturn} Statuscode NotFound if board does not find, if board updated Statuscode Ok and new board
 */
const udpateBoard = (boardId: string, newBoard: INewBoard): IServiceReturn => {
  const board = boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  board.title = newBoard.title;
  board.columns = newBoard.columns;
  return { code: StatusCode.Ok, send: board };
};

export default { getAll, getBoard, createBoard, deleteBoard, udpateBoard };
