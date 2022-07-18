const {
  createUser,
  login,
  me,
  updateProfile,
  getAllUsers,
} = require('../controller/userControllers');

const router = require('express').Router();

router.route('/create').post(createUser);
router.route('/all').get(getAllUsers);
router.route('/login').post(login);
router.route('/:id').get(me).patch(updateProfile);

module.exports = router;
