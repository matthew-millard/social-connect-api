import models from '../models/index.js';
const { User } = models;

// GET all users
export async function getUsers(req, res) {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// GET a user by id
export async function getSingleUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId }).populate(['thoughts', 'friends']);

    if (!user) {
      return res.status(404).json({ message: 'No user found with that id.' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// CREATE new user
export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// UPDATE user by id
export async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this id.' });
    }

    return res.status(200).json({ message: 'User successfully updated.', user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// DELETE user by id
export async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'No user found with that id.' });
    }

    // Remove user and its associated thoughts
    await user.deleteOne();
    return res.status(200).json({ message: 'User and associated thoughts have been deleted.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// ADD friend to user's friend list
export async function addFriend(req, res) {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    // Find user and update their friends array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with that id.' });
    }

    return res.status(200).json({ message: 'Friend added successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// DELETE friend from friend list
export async function deleteFriend(req, res) {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    const user = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User with that id not found.' });
    }
    return res.status(200).json({ message: 'Friend has been successfully deleted.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}
