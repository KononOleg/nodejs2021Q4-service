import { IBoard } from './interfaces/IBoard';

const boards: IBoard[] = [];

const getAll = (): IBoard[] => boards;

const getBoard = (boardId: string): IBoard | undefined =>
  boards.find((board: IBoard) => board.id === boardId);

const createBoard = (newBoard: IBoard): void => {
  boards.push(newBoard);
};

const deleteBoard = (board: IBoard): void => {
  boards.splice(boards.indexOf(board), 1);
};
export default { getAll, getBoard, createBoard, deleteBoard };
