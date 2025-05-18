import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/check',authMiddleware, userController.checkAuth);
router.put('/update',authMiddleware, userController.updateProfile);
router.get('/logout', userController.logout);
router.get('/getuser/:id', userController.getUserById);
export default router;