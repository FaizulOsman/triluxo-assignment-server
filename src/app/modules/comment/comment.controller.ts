/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { CommentService } from './comment.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IComment } from './comment.interface';
import { commentFilterableFields } from './comment.constants';
import { paginationFields } from '../../../constants/pagination';
import { pick } from '../../../shared/pick';

// Create Comment
const createComment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...commentData } = req.body;

    const result = await CommentService.createComment(commentData);

    // Send Response
    sendResponse<IComment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment Created Successfully',
      data: result,
    });
  }
);

// Get all comments
const getAllComments: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, commentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CommentService.getAllComments(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IComment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comments retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Comment by id
const getSingleComment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CommentService.getSingleComment(id);

    // Send Response
    sendResponse<IComment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Comment Successfully',
      data: result,
    });
  }
);

// Update Comment
const updateComment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await CommentService.updateComment(id, updateData);

  sendResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data: result,
  });
});

// Delete Comment
const deleteComment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await CommentService.deleteComment(id);

  sendResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  });
});

export const CommentController = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
