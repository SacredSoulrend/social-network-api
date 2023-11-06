const { Thought, User } = require('../models');

const thoughtController = {
  // Create a new thought
  createThought: function ({ body }, res) {
    // Find the user based on the provided username
    User.findOne({ username: body.username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Create the thought associated with the found user
        return Thought.create({
          thoughtText: body.thoughtText,
          username: body.username,
        });
      })
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: body.username },
          {
            $addToSet: { thoughts: thought._id },
          },
          { new: true }
        );
      })
      .then((user) => {
        res.json({ message: 'Thought created', user });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Get all thoughts
  getThoughts: function (req, res) {
    Thought.find({})
      .populate('reactions')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  // Get a single thought by its _id
  getThoughtById: function ({ params }, res) {
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
  updateThought: function ({ params, body }, res) {
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
deleteThought: function ({ params }, res) {
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
  createReaction: function ({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
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

  // Delete a reaction by the reaction's reactionId value
  deleteReaction: function ({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
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

