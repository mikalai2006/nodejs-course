const uuid = require('uuid');

class Columns {
  constructor({ id = uuid(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Boards {
  constructor({ id = uuid(), title = 'Board' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = new Columns();
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    // work with other property
    // ...
    return { id, title, columns };
  }
}

module.exports = Boards;
