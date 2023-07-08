import express from 'express';
const router = express.Router();
import {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} from '../../controllers/thoughtController.js';

// /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:_id
router.route('/:_id').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;
