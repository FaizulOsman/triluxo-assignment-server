/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { BlogService } from './blog.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IBlog } from './blog.interface';
import { blogFilterableFields } from './blog.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create Blog
const createBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...blogData } = req.body;

    const result = await BlogService.createBlog(blogData, verifiedUser);

    // Send Response
    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog Created Successfully',
      data: result,
    });
  }
);

// Get all Blogs
const getAllBlogs: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters: any = pick(req.query, blogFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BlogService.getAllBlogs(filters, paginationOptions);

    // Send Response
    sendResponse<IBlog[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get Blogs By Authorization
const getBlogsByAuthorization: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters: any = pick(req.query, blogFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await BlogService.getBlogsByAuthorization(
      filters,
      paginationOptions,
      verifiedUser
    );

    // Send Response
    sendResponse<IBlog[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Blog by id
const getSingleBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BlogService.getSingleBlog(id);

    // Send Response
    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Blog Successfully',
      data: result,
    });
  }
);

// Update Blog
const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const token: any = req.headers.authorization;
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const result = await BlogService.updateBlog(id, updateData, verifiedUser);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

// Delete Blog
const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const token: any = req.headers.authorization;
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const result = await BlogService.deleteBlog(id, verifiedUser);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogsByAuthorization,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
