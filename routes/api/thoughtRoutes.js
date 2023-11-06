
const router = require('express').Router();
const { createThought, getThoughts, getThoughtById, updateThought, deleteThought } = require('../../controllers/thoughtController');

// Define thought routes
router.route('/')
  .get(getThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
