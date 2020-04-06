const { $text } = require('../../common/locale');
const { Apps } = require('../app');

const getTasks = async (boardId, taskId) => {
  const output = await (await Apps).getTasks(boardId, taskId);
  return output;
};

const createTask = async (data, callback) => {
  const newTask = await (await Apps).addItem('tasks', data);
  if (newTask) {
    return callback(null, newTask);
  }
  return callback($text('er400'), null);
};

const removeTask = async (id, callback) => {
  const msg = await (await Apps).removeItem('tasks', id);
  if (msg) {
    return callback(null, msg);
  }
  return callback($text('ber404'), null);
};

const updateTask = async (data, callback) => {
  const msg = await (await Apps).updateTask(data);
  if (msg) {
    return callback(null, msg);
  }
  return callback($text('er400'), null);
};

module.exports = { getTasks, createTask, removeTask, updateTask };
