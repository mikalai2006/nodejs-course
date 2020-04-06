const router = require('express').Router();
const controller = require('./boards.controller');
const controllerTask = require('../tasks/tasks.controller');

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getBoard);
router.route('/').post(controller.createBoard);
router.route('/:id').delete(controller.removeBoard);
router.route('/:id').put(controller.updateBoard);

router.route('/:id/tasks').get(controllerTask.getAllTasks);
module.exports = router;
