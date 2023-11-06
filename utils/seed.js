const mongoose = require('mongoose');
const connection = require('../config/connection');
const { initialUserData, initialThoughtData, initialReactionData, getRandomUserData, getRandomThoughtData, getRandomReactionData } = require('./data');
const { User, Thought, Reaction } = require('./models');

async function seedDatabase() {
  try {
    // Clear existing data (optional)
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // Insert initial user data
    const users = await User.insertMany(initialUserData);

    // Insert initial thought data
    const thoughts = await Thought.insertMany(initialThoughtData);

    // Insert initial reaction data
    const reactions = await Reaction.insertMany(initialReactionData);

    // Seed with random thoughts and reactions
    for (let i = 0; i < 5; i++) {
      const randomUser = getRandomUserData();
      const randomThought = getRandomThoughtData();
      const randomReaction = getRandomReactionData();

      // Create a random thought associated with a random user
      const newThought = await Thought.create({
        ...randomThought,
        username: randomUser.username,
      });

      // Create a random reaction associated with a random thought
      const newReaction = await Reaction.create({
        ...randomReaction,
        thoughtId: newThought._id,
      });

      // Add the thought to the user's thoughts array
      await User.findByIdAndUpdate(randomUser._id, { $push: { thoughts: newThought._id } });

      // Add the reaction to the thought's reactions array
      await Thought.findByIdAndUpdate(newThought._id, { $push: { reactions: newReaction } });
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    connection.close(); // Close the connection
  }
}

seedDatabase();
