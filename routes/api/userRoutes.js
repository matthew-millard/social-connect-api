import express from 'express';
const router = express.Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser } from '../../controllers/userController.js';

// /api/users/
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
