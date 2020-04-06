const { $text } = require('../../common/locale');
const { Apps } = require('./../app');

const getAll = async () => {
  const outputUsers = await (await Apps).getItems('users');
  return outputUsers;
};

const getUser = async (id, callback) => {
  const allUsers = await getAll('users');
  const user = allUsers.find(x => x.id === id);
  if (user) {
    return callback(null, user);
  }
  return callback($text('er404'), null);
};

const createUser = async (data, callback) => {
  const newUser = await (await Apps).addItem('users', data);
  console.log('create user > ', newUser);
  // validate data for newUser
  if (newUser) {
    return callback(null, newUser);
  }
  return callback($text('er400'), null);
};

const removeUser = async (id, callback) => {
  const msg = await (await Apps).removeItem('users', id);
  // console.log('remove user > ', id, `[${msg}]`);
  if (msg) {
    return callback(null, msg);
  }
  return callback($text('er404'), null);
};

const updateUser = async (data, callback) => {
  const msg = await (await Apps).updateItem('users', data);
  if (msg) {
    return callback(null, msg);
  }
  return callback($text('er400'), null);
};

module.exports = { getAll, getUser, createUser, removeUser, updateUser };
