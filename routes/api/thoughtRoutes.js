import express from 'express';
const router = express.Router();
import { getThoughts, getSingleThought } from '../../controllers/thoughtController.js';

// /api/thoughts/
router.route('/').get(getThoughts);

// /api/thoughts/:_id
router.route('/:_id').get(getSingleThought);

export default router;
