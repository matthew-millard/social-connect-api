import User from '../models/User.js';
import faker from 'faker';

const populateThoughts = async () => {
  try {
    // Fetch up to 20 users from the database
    const users = await User.find().limit(20);

    let thoughts = [];

    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      // Create a new thought object with a fake sentence,
      // the username from the randomly selected user,
      // and the ID of the randomly selected user
      const thought = {
        thoughtText: faker.lorem.sentence(),
        username: randomUser.username,
        userId: randomUser._id,
      };

      thoughts.push(thought);
    }

    return thoughts;
  } catch (err) {
    console.error(err);
  }
};

export default populateThoughts;
