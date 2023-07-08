import models from '../models/index.js';
const { Thought } = models;

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
