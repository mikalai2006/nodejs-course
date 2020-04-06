const uuid = require('uuid');

class Tasks {
  constructor({
    id = uuid(),
    title = 'Task title',
    order = 0,
    description = 'Task description',
    userId = 0,
    boardId = 0,
    columnId = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.boardId = boardId;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
  }
  static toResponse(task) {
    const { id, title, order, description, userId, columnId, boardId } = task;
    return { id, title, order, description, userId, columnId, boardId };
  }
}

module.exports = Tasks;
