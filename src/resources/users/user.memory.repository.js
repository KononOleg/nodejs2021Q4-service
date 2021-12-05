const users = [];

const getAll = () => users;

const getUser = (userId) => users.find((user) => user.id === userId);

const createUser = (newUser) => {
  users.push(newUser);
};

const deleteUser = (user) => {
  users.splice(users.indexOf(user), 1);
};
module.exports = { getAll, getUser, createUser, deleteUser };
