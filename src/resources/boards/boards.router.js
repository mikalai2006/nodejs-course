const router = require('express').Router();
const controller = require('./boards.controller');
const controllerTask = require('../tasks/tasks.controller');

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getBoard);
router.route('/').post(controller.createBoard);
router.route('/:id').delete(controller.removeBoard);
router.route('/:id').put(controller.updateBoard);

router.route('/:boardId/tasks').get(controllerTask.getAllTasks);
router.route('/:boardId/tasks/:taskId').get(controllerTask.getAllTasks);
router.route('/:boardId/tasks').post(controllerTask.createTask);
router.route('/:boardId/tasks/:taskId').put(controllerTask.updateTask);
router.route('/:boardId/tasks/:taskId').delete(controllerTask.removeTask);
module.exports = router;
