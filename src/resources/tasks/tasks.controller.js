const boardsService = require('./tasks.service');
const { $text } = require('../../common/locale');

exports.createBoard = (req, res) => {
  const data = req.body;
  if (!data.title) {
    res.status(400).send($text('ber404'));
  }
  boardsService.createBoard(data, (err, newUser) => {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json(newUser);
  });
};
exports.getBoard = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).send($text('ber404'));
    return;
  }
  await boardsService.getBoard(req.params.id, (error, response) => {
    if (response) {
      res.status(200).json(response);
    } else if (error) {
      res.status(404).json(error);
    }
  });
  // res.json(user);
};

exports.getAllTasks = async (req, res) => {
  const items = await boardsService.getAllTasks();
  res.json(items);
};

exports.removeBoard = (req, res) => {
  const { id } = req.params;
  boardsService.removeBoard(id, (err, response) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(204).send(response);
    }
  });
};

exports.updateBoard = (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const data = {
    ...body,
    id
  };
  boardsService.updateBoard(data, (err, response) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(response);
    }
  });
};
