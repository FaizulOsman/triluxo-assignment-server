import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
const router = express.Router();

// Routes
router.post(
  '/create-blog',
  validateRequest(BlogValidation.createBlogZodValidation),
  BlogController.createBlog
);
router.get(
  '/get-blogs-by-authorization',
  BlogController.getBlogsByAuthorization
);
router.get('/:id', BlogController.getSingleBlog);

router.delete('/:id', BlogController.deleteBlog);

router.patch(
  '/:id',
  validateRequest(BlogValidation.updateBlogZodValidation),
  BlogController.updateBlog
);

router.get('/', BlogController.getAllBlogs);

export const BlogRoutes = router;
