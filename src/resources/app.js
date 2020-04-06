const usersRepo = require('./users/user.memory.repository');
const boardsRepo = require('./boards/boards.memory.repository');
const User = require('./users/user.model');
const Boards = require('./boards/boards.model');
const { $text } = require('../common/locale');

const AppData = class {
  constructor() {
    this.users = [];
    this.boards = [];
    this.tasks = [];
  }
  getItems(type) {
    let items;
    switch (type) {
      case 'users':
        items = this[type].map(User.toResponse);
        break;
      case 'boards':
        items = this[type].map(Boards.toResponse);
        break;
      default:
        break;
    }
    return items;
  }
  addItem(type, data) {
    let newItems;
    let items;
    switch (type) {
      case 'users':
        items = new User(data);
        this[type].push(items);
        newItems = User.toResponse(items);
        break;
      case 'boards':
        items = new Boards(data);
        this[type].push(items);
        newItems = Boards.toResponse(items);
        break;
      default:
        break;
    }
    return newItems;
  }
  removeItem(type, id) {
    const removeItem = this.findItem(type, id);
    if (!removeItem.item) {
      return;
    }
    this[type].splice(removeItem.indexItem, 1);
    return $text('deluser204');
  }

  updateItem(type, data) {
    const { id } = data;
    if (!id) {
      return;
    }
    const updateItem = this.findItem(type, id);
    if (!updateItem.item) {
      return;
    }
    delete data.id;
    this[type][updateItem.indexItem] = Object.assign(
      {},
      this[type][updateItem.indexItem],
      data
    );
    return this[type][updateItem.indexItem];
  }

  findItem(type, id) {
    const indexItem = this[type].findIndex(x => String(x.id) === String(id));
    return {
      item: this[type][indexItem],
      indexItem
    };
  }
  async create() {
    const users = await usersRepo
      .getAll()
      .then(data => {
        return data;
      })
      .catch(err => console.log(err));
    this.users = users;
    const boards = await boardsRepo
      .getAll()
      .then(data => {
        return data;
      })
      .catch(err => console.log(err));
    this.boards = boards;
    return this;
  }
};
const Apps = new AppData().create().then(x => {
  console.log(x);
  return x;
});

module.exports = {
  Apps
};
