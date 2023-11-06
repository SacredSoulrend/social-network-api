const mongoose = require('mongoose');
const connection = require('../config/connection');
const { initialUserData, initialThoughtData, getRandomUserData, getRandomThoughtData, getRandomReactionData } = require('./data');
const { User, Thought } = require('../models'); // Update the import

async function seedDatabase() {
  try {
    // Clear existing data (optional)
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert initial user data
    const users = await User.insertMany(initialUserData);

    // Insert initial thought data
    const thoughts = await Thought.insertMany(initialThoughtData);

    // Seed with random thoughts and reactions
    for (let i = 0; i < 5; i++) {
      const randomUser = getRandomUserData();
      const randomThought = getRandomThoughtData();
      const randomReactions = Array.from({ length: 3 }, () => getRandomReactionData()); // Create random reactions

      // Create a random thought associated with a random user
      const newThought = await Thought.create({
        ...randomThought,
        username: randomUser.username,
        reactions: randomReactions, // Include the random reactions
      });

      // Add the thought to the user's thoughts array
      await User.findByIdAndUpdate(randomUser._id, { $push: { thoughts: newThought._id } });
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    connection.close(); // Close the connection
  }
}

seedDatabase();

