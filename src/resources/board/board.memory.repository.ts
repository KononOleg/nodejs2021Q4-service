import { IBoard } from './interfaces/IBoard';

const boards: IBoard[] = [];

/**
 * Returns all boards
 * @returns {IBoard[]} all boards
 */
const getAll = (): IBoard[] => boards;

/**
 * Returns the board by Id
 * @param {string} boardId board Id
 * @returns {IBoard | undefined} the user by Id
 */
const getBoard = (boardId: string): IBoard | undefined =>
  boards.find((board: IBoard) => board.id === boardId);

/**
 * Create a new board
 * @param {IBoard} newBoard board Id
 * @returns {void}
 */
const createBoard = (newBoard: IBoard): void => {
  boards.push(newBoard);
};

/**
 * Delete board
 * @param {IBoard} board board, which needs to be removed
 * @returns {void}
 */
const deleteBoard = (board: IBoard): void => {
  boards.splice(boards.indexOf(board), 1);
};
export default { getAll, getBoard, createBoard, deleteBoard };
