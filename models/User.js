const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // User's username
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  // User's email
  email: {
    type: String,
    required: true,
    unique: true,
    // Email format validation using a regular expression
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  // An array of references to Thought documents
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  // An array of references to User documents (self-reference for friends)
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Define a virtual property to calculate the number of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
