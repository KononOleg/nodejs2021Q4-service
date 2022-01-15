import { getRepository } from 'typeorm';
import Board from './board.model';
import ColumnEntity from './column.model';
import { IBoard } from './interfaces/IBoard';
import { INewBoard } from './interfaces/INewBoard';
import { INewColumn } from './interfaces/INewColumn';

/**
 * Returns all boards
 * @returns {Promise<IBoard[]>} all boards
 */
const getAll = (): Promise<IBoard[]> =>
  getRepository(Board).find({ relations: ['columns'] });

/**
 * Returns the board by Id
 * @param {string} boardId board Id
 * @returns { Promise<IBoard | undefined>} the user by Id
 */
const getBoard = async (boardId: string): Promise<IBoard | undefined> =>
  getRepository(Board).findOne(boardId, { relations: ['columns'] });

/**
 * Create a new board
 * @param {IBoard} newBoard board Id
 * @returns {Promise<IBoard>}
 */
const createBoard = async (newBoard: INewBoard): Promise<IBoard> => {
  const createdBoard = newBoard;
  const columns = await Promise.all(
    newBoard.columns.map(async (column: INewColumn) => {
      const newColumn = new ColumnEntity();
      newColumn.order = column.order;
      newColumn.title = column.title;
      await getRepository(ColumnEntity).save(newColumn);
      return newColumn;
    })
  );
  createdBoard.columns = columns;
  const result = getRepository(Board).save(newBoard);
  return result;
};

/**
 * Delete board
 * @param {IBoard} board board, which needs to be removed
 * @returns {void}
 */
const deleteBoard = async (board: IBoard): Promise<void> => {
  await getRepository(ColumnEntity).delete({ board });
  await getRepository(Board).delete(board.id);
};

/**
 * Update board
 * @param {IBoard} board board, which needs to be update
 * @param {IBoard} newBoard new board body
 * @returns {Promise<IBoard>} updateBoard return updated board
 */
const updateBoard = async (
  board: IBoard,
  newBoard: INewBoard
): Promise<IBoard> => {
  getRepository(Board).merge(board, newBoard);
  const result = await getRepository(Board).save(board);
  return result;
};
export default { getAll, getBoard, createBoard, deleteBoard, updateBoard };
