const boards = [];

const getAll = () => boards;

const getBoard = (boardId) => boards.find((board) => board.id === boardId);

const createBoard = (newBoard) => {
  boards.push(newBoard);
};

const deleteBoard = (board) => {
  boards.splice(boards.indexOf(board), 1);
};
module.exports = { getAll, getBoard, createBoard, deleteBoard };
