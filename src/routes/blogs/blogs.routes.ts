import express from 'express';
import {createBlog, getAllBlogs, getBlogById} from "../../controllers/blogs/blogs.controller";
import {authenticateToken} from "../../middlewares/auth.middleware";

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/create', authenticateToken, createBlog);

export default router;