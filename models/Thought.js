const mongoose = require('mongoose');

// Define the reaction schema as a subdocument schema
const reactionSchema = new mongoose.Schema({
  // Content of the reaction
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  // Username of the user who reacted
  username: {
    type: String,
    required: true,
  },
  // Timestamp when the reaction was created
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => {
      return new Date(timestamp).toISOString();
    },
  },
});

// Define the thought schema
const thoughtSchema = new mongoose.Schema({
  // Content of the thought
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  // Timestamp when the thought was created
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => {
      return new Date(timestamp).toISOString();
    },
  },
  // Username of the user who created the thought
  username: {
    type: String,
    required: true,
  },
  // Array of nested reaction documents
  reactions: [reactionSchema], // Reactions are stored as subdocuments
});

// Define a virtual property to calculate the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model using the thought schema
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
