const { User } = require('../models');

const userController = {
  // Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // Get all users
  getUsers(req, res) {
    User.find({})
      .populate('thoughts friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err));
  },

  // Get a single user by their _id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate('thoughts friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a user by their _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Remove a user by their _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add a new friend to a user's friend list
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
