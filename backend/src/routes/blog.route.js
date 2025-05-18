import * as blogController from '../controllers/blog.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';
import { Router } from 'express';

const router = Router();


router.post('/create-blog',authMiddleware,blogController.createBlog);
router.get('/getall-blog',authMiddleware,blogController.getAllBlogs);
router.get('/delete-blog/:id',authMiddleware,blogController.deleteBlog);
router.get('/get-blog/:id',authMiddleware,blogController.getBlogById);
router.post('/comment/:id',authMiddleware,blogController.commentOnBlog);
router.get('/get-blogsBy-user/:id',authMiddleware,blogController.getBlogsByUser);
router.get('/getAll-comments/:id',authMiddleware,blogController.getAllComments);


export default router;