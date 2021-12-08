const users:any = [];

const getAll = () => users;

const getUser = (userId:any) => users.find((user:any) => user.id === userId);

const createUser = (newUser:any) => {
  users.push(newUser);
};

const deleteUser = (user:any) => {
  users.splice(users.indexOf(user), 1);
};
export default { getAll, getUser, createUser, deleteUser };
