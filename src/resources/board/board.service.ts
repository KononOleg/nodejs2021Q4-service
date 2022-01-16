import boardsRepo from './board.memory.repository';
import StatusCode from '../../StatusCode/StatusCode';
import { IBoard } from './interfaces/IBoard';
import { INewBoard } from './interfaces/INewBoard';
import { IServiceReturn } from './interfaces/IServiceReturn';

/**
 * Returns all board
 * @returns {Promise<IBoard[]>} all users
 */
const getAll = async (): Promise<IBoard[]> => {
  const allBoard = await boardsRepo.getAll();
  return allBoard;
};

/**
 * Returns the board by Id
 * @param {string} boardId user Id
 * @returns {IServiceReturn} Statuscode NotFound if board does not find, if board finds Statuscode Ok and board
 */
const getBoard = async (boardId: string): Promise<IServiceReturn> => {
  const board = await boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  return { code: StatusCode.Ok, send: board };
};

/**
 * Create new board
 * @param {IBoard} board new board
 * @returns {Promise<IServiceReturn>} Statuscode Created and new board
 */
const createBoard = async (board: INewBoard): Promise<IServiceReturn> => {
  const createdBoard = await boardsRepo.createBoard(board);
  return { code: StatusCode.Created, send: createdBoard };
};

/**
 * Delete board
 * @param {string} boardId board Id
 * @returns {IServiceReturn} Statuscode NotFound if board does not find, if board deleted Statuscode Ok
 */
const deleteBoard = async (boardId: string): Promise<IServiceReturn> => {
  const board = await boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  await boardsRepo.deleteBoard(board);
  /*   const tasks = tasksRepo.getAll(boardId);
  tasks.map((task: ITask) => tasksRepo.deleteTask(task)); */
  return { code: StatusCode.NoContent };
};

/**
 * Udpate board
 * @param {string} boardId board Id
 * @param {INewBoard} newBoard new board
 * @returns {IServiceReturn} Statuscode NotFound if board does not find, if board updated Statuscode Ok and new board
 */
const udpateBoard = async (
  boardId: string,
  newBoard: INewBoard
): Promise<IServiceReturn> => {
  const board = await boardsRepo.getBoard(boardId);
  if (!board) return { code: StatusCode.NotFound };
  const updateBoard = await boardsRepo.updateBoard(board, newBoard);
  return { code: StatusCode.Ok, send: updateBoard };
};

export default { getAll, getBoard, createBoard, deleteBoard, udpateBoard };
