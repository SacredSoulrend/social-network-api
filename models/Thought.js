const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  // The content of the thought
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  // The timestamp when the thought was created
  createdAt: {
    type: Date,
    default: Date.now,
    // Format the timestamp for query responses
    get: (timestamp) => {
      return new Date(timestamp).toISOString();
    },
  },
  // The username of the user who created the thought
  username: {
    type: String,
    required: true,
  },
  // An array of nested reaction documents
  reactions: [
    {
      // A unique identifier for the reaction
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      // The content of the reaction
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      // The username of the user who reacted
      username: {
        type: String,
        required: true,
      },
      // The timestamp when the reaction was created
      createdAt: {
        type: Date,
        default: Date.now,
        // Format the timestamp for query responses
        get: (timestamp) => {
          return new Date(timestamp).toISOString();
        },
      },
    },
  ],
});

// Define a virtual property to calculate the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
