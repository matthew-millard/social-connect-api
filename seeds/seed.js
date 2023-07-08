import connection from '../config/connection.js';
import models from '../models/index.js';
const { User, Thought } = models;
import populateUsers from '../utils/generate-users.js';
import populateThoughts from '../utils/generate-thoughts.js';

connection.on('error', err => console.error(err));

connection.once('open', async () => {
  try {
    console.log('Connection made, starting seed...');

    // Drop all existing users and thoughts
    await Promise.all([User.deleteMany({}), Thought.deleteMany({})]);

    // Generate user data
    const users = populateUsers();

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    // Generate thought data
    const thoughts = await populateThoughts();

    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thoughts);

    console.log('Data seeded successfully 🌱');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});
