
const router = require('express').Router();
const { createThought, getThoughts, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtController');

// Define thought routes
router.route('/')
  .get(getThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  // Add new route for managing reactions
router.route('/:thoughtId/reactions')
.post(createReaction) 
.delete(deleteReaction);

module.exports = router;
