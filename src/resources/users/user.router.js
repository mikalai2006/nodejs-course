const router = require('express').Router();
const controllerUser = require('./user.controller');

router.route('/').get(controllerUser.getAllUsers);
router.route('/:id').get(controllerUser.getOneUser);
router.route('/').post(controllerUser.createUser);
router.route('/:id').delete(controllerUser.removeUser);
router.route('/:id').put(controllerUser.updateUser);

module.exports = router;
