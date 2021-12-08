const boards:any = [];

const getAll = () => boards;

const getBoard = (boardId:any) => boards.find((board:any) => board.id === boardId);

const createBoard = (newBoard:any) => {
  boards.push(newBoard);
};

const deleteBoard = (board:any) => {
  boards.splice(boards.indexOf(board), 1);
};
export default { getAll, getBoard, createBoard, deleteBoard };
