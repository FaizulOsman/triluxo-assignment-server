import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
const router = express.Router();

// Routes
router.post(
  '/create-blog',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BlogValidation.createBlogZodValidation),
  BlogController.createBlog
);

router.get('/:id', BlogController.getSingleBlog);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BlogController.deleteBlog);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BlogValidation.updateBlogZodValidation),
  BlogController.updateBlog
);

router.get('/', BlogController.getAllBlogs);

export const BlogRoutes = router;
