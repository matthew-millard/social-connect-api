import express from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

// /api/users
router.use('/users', userRoutes);

// /api/thoughts
router.use('/thoughts', thoughtRoutes);

export default router;
