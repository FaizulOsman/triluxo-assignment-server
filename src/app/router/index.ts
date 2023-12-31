import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { BlogRoutes } from '../modules/blog/blog.route';
import { CommentRoutes } from '../modules/comment/comment.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
];

moduleRoutes?.forEach(route => router.use(route?.path, route?.route));

export default router;
