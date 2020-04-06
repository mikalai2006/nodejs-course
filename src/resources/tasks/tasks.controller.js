const tasksService = require('./tasks.service');
const { $text } = require('../../common/locale');

exports.createTask = (req, res) => {
  let data = req.body;
  data = { ...data, ...req.params };
  if (!data.title) {
    res.status(400).send($text('ber404'));
  }
  tasksService.createTask(data, (err, newTask) => {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json(newTask);
  });
};

exports.getAllTasks = async (req, res) => {
  const { boardId, taskId } = req.params;
  const items = await tasksService.getTasks(boardId, taskId);
  if (!items) {
    res.status(404).json('error');
  } else {
    res.status(200).send(items);
  }
};

exports.removeTask = (req, res) => {
  const { taskId } = req.params;
  tasksService.removeTask(taskId, (err, response) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(204).send(response);
    }
  });
};

exports.updateTask = (req, res) => {
  const body = req.body;
  const { boardId, taskId } = req.params;
  const data = {
    ...body,
    boardId,
    taskId
  };
  tasksService.updateTask(data, (err, response) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(response);
    }
  });
};
