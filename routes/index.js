import express from 'express';
const router = express.Router();
import apiRoutes from './api/index.js';

// Define api routes
// /api
router.use('/api', apiRoutes);

// Wildcard route
router.get('*', (req, res) => {
  res.status(404).json({ message: 'Invalid route' });
});

export default router;
