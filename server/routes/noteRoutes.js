const {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require('../controller/noteControllers');
const { authenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/create').post(authenticatedUser, createNote);
router.route('/').get(authenticatedUser, getAllNotes);
router.route('/:id').patch(updateNote).delete(deleteNote);

module.exports = router;
