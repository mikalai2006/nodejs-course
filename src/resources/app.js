const usersRepo = require('./users/user.memory.repository');
const boardsRepo = require('./boards/boards.memory.repository');
const tasksRepo = require('./tasks/tasks.memory.repository');
const User = require('./users/user.model');
const Boards = require('./boards/boards.model');
const Tasks = require('./tasks/tasks.model');
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
  getTasks(idBoard, taskId = false) {
    const allTasks = this.tasks.filter(x => x.boardId === idBoard);
    let items = allTasks.length > 0 ? allTasks : [];
    if (taskId) {
      items = allTasks.find(x => x.id === taskId);
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
      case 'tasks':
        items = new Tasks(data);
        this[type].push(items);
        newItems = Tasks.toResponse(items);
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

    if (type === 'users') {
      const allUserTasks = this.tasks.filter(
        x => x.userId === removeItem.item.id
      );
      allUserTasks.forEach(element => {
        element.userId = null;
        this.updateTask(element.boardId, element);
      });
    }

    if (type === 'boards') {
      this.removeTask(removeItem.item.id);
    }

    return $text('deluser204');
  }
  removeTask(boardId) {
    if (!boardId) {
      return;
    }
    const newTasks = this.tasks.filter(x => x.boardId !== boardId);

    this.tasks = newTasks;

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

  updateTask(data) {
    const { boardId, taskId } = data;
    if (!boardId || !taskId) {
      return;
    }
    const index = this.tasks.findIndex(
      x => x.id === taskId && x.boardId === boardId
    );
    if (!index) {
      return;
    }
    this.tasks[index] = new Tasks(data);
    return this.tasks[index];
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
    const tasks = await tasksRepo
      .getAll()
      .then(data => {
        return data;
      })
      .catch(err => console.log(err));
    this.tasks = tasks;
    return this;
  }
};
const Apps = new AppData().create().then(x => {
  return x;
});

module.exports = {
  Apps
};
