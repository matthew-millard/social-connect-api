import express from 'express';
const router = express.Router();
import {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} from '../../controllers/thoughtController.js';

// /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:_id
router.route('/:_id').get(getSingleThought).put(updateThought).delete(deleteThought);

export default router;
