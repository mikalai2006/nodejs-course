const { $text } = require('../../common/locale');
const { Apps } = require('../app');

const getAll = async () => {
  const output = await (await Apps).getItems('boards');
  return output;
};

const getBoard = async (id, callback) => {
  const allBoard = await getAll('boards');
  const board = allBoard.find(x => x.id === id);
  if (board) {
    return callback(null, board);
  }
  return callback($text('ber404'), null);
};

const createBoard = async (data, callback) => {
  const newBoard = await (await Apps).addItem('boards', data);
  // console.log('create board > ', newBoard);
  if (newBoard) {
    return callback(null, newBoard);
  }
  return callback($text('er400'), null);
};

const removeBoard = async (id, callback) => {
  const msg = await (await Apps).removeItem('boards', id);
  if (msg) {
    return callback(null, msg);
  }
  return callback($text('ber404'), null);
};

const updateBoard = async (data, callback) => {
  const msg = await (await Apps).updateItem('boards', data);
  if (msg) {
    return callback(null, msg);
  }
  return callback($text('er400'), null);
};

module.exports = { getAll, getBoard, createBoard, removeBoard, updateBoard };
