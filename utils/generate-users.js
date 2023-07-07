// Importing faker library for generating fake data
import faker from 'faker';

// Function to generate an array of user objects
const populateUsers = () => {
  let users = [];

  // Looping 50 times to generate 50 users
  for (let i = 0; i < 50; i++) {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };

    users.push(user);
  }
  return users;
};

export default populateUsers;
