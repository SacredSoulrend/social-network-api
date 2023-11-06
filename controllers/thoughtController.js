const { Thought, User } = require('../models');

const thoughtController = {
  // Create a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        // Add the thought's _id to the associated user's thoughts array
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Thought created and added to user' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .populate('reactions')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  // Get a single thought by its _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate('reactions')
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought by its _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Remove a thought by its _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought deleted' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Create a reaction stored in a thought's reactions array
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a reaction by the reaction's reactionId value
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;

