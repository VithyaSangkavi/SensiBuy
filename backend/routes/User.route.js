import express from 'express';
const router = express.Router();
import * as userController from '../controllers/User.controller.js';

router.post('/login', userController.loginUser)

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

export default router;
