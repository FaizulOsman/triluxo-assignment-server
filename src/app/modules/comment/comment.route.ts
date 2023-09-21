import express from 'express';
import { CommentController } from './comment.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidation } from './comment.validation';
const router = express.Router();

// Routes
router.post(
  '/create-comment',
  validateRequest(CommentValidation.createCommentZodValidation),
  CommentController.createComment
);

// router.get('/:id', CommentController.getSingleComment);
router.get('/:id', CommentController.getCommentsById);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CommentController.deleteComment
);

router.patch(
  '/:id',
  validateRequest(CommentValidation.updateCommentZodValidation),
  CommentController.updateComment
);

router.get('/', CommentController.getAllComments);

export const CommentRoutes = router;
