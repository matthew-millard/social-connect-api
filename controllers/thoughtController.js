import models from '../models/index.js';
const { Thought, User } = models;

// GET all thoughts
export async function getThoughts(req, res) {
  try {
    const thoughts = await Thought.find({});

    if (thoughts.length === 0) {
      return res.status(404).json({ message: 'No thoughts found.' });
    }

    return res.status(200).json(thoughts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// GET a single thought by id
export async function getSingleThought(req, res) {
  try {
    const thoughtId = req.params._id;

    const thought = await Thought.findOne({ _id: thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that id found.' });
    }

    return res.status(200).json(thought);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// CREATE a new thought
export async function createThought(req, res) {
  try {
    const userId = req.body.userId;

    // Create a new Thought
    const newThought = await Thought.create(req.body);

    // Check if the newThought is successfully created
    if (!newThought) {
      return res.status(404).json({ message: 'Unable to save thought.' });
    }

    // Update the user with the new thought
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { runValidators: true, new: true }
    );

    // Check if the user is successfully updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'Unable to update user with new thought.' });
    }

    return res.status(200).json({ message: "Thought has been successfully created and added to the user's account." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// UPDATE thought by id
export async function updateThought(req, res) {
  try {
    const thoughtId = req.params._id;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $set: { thoughtText: req.body.thoughtText } },
      { runValidators: true, new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with that id found.' });
    }

    return res.status(200).json({ message: 'Thought has been successfully updated', thought: updatedThought });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// DELETE a thought by id
export async function deleteThought(req, res) {
  try {
    const thoughtId = req.params._id;

    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    // Check if a thought was actually deleted
    if (!deletedThought) {
      return res.status(404).json({ message: 'No thought with that id found.' });
    }

    return res.status(200).json({ message: 'Thought has been successfully deleted.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}
