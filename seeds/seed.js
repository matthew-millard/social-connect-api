import connection from '../config/connection.js';
import models from '../models/index.js';
const { User } = models;
import populateUsers from '../utils/generate-users.js';

connection.on('error', err => console.error(err));

connection.once('open', async () => {
  try {
    console.log('Connection made, starting seed...');

    // Drop existing users
    await User.deleteMany({});

    // Generate user data
    const users = populateUsers();

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    console.log('Data seeded successfully 🌱');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});
