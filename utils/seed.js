const mongoose = require('mongoose');
const connection = require('../config/connection');
const { initialUserData, initialThoughtData } = require('./data');
const { User, Thought } = require('../models');

async function seedDatabase() {
  try {
    // Clear existing data (optional)
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert initial user data
    const users = await User.insertMany(initialUserData);

    // Insert initial thought data
    const thoughts = await Thought.insertMany(initialThoughtData);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    connection.close(); // Close the connection
  }
}

seedDatabase();

