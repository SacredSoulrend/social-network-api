const initialUserData = [
  {
    username: 'user1',
    email: 'user1@example.com',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
  },
  {
    username: 'user3',
    email: 'user3@example.com',
  },
];

const initialThoughtData = [
  {
    thoughtText: 'This is a sample thought from user1',
    username: 'user1',
  },
  {
    thoughtText: 'Another thought from user2',
    username: 'user2',
  },
  {
    thoughtText: 'A thought from user3',
    username: 'user3',
  },
];

const initialReactionData = [
  {
    reactionBody: 'A reaction to the first thought',
    username: 'user2',
  },
  {
    reactionBody: 'A reaction to the second thought',
    username: 'user3',
  },
  {
    reactionBody: 'Another reaction to the first thought',
    username: 'user1',
  },
];

module.exports = {
  initialUserData,
  initialThoughtData,
  initialReactionData,
};
