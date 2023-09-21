/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IBlog, IBlogFilters } from './blog.interface';
import { Blog } from './blog.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { blogSearchableFields } from './blog.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Blog
const createBlog = async (
  payload: IBlog,
  verifiedUser: any
): Promise<IBlog | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Blog.create(payload);
  return result;
};

// Get All Blogs (can also filter)
const getAllBlogs = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions,
  verifiedUser: any
): Promise<IGenericResponse<IBlog[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: blogSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  let result = await Blog.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  if (verifiedUser?.role === 'user') {
    result = await Blog.find({
      $and: [whereCondition, { email: verifiedUser?.email }],
    })
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
  }

  const total = await Blog.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Blog
const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById(id);

  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
  verifiedUser: any
): Promise<IBlog | null> => {
  const isExist = await Blog.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog not found');
  }

  if (verifiedUser?.role === 'user' && isExist?.email !== verifiedUser?.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not allowed');
  }

  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Blog
const deleteBlog = async (
  id: string,
  verifiedUser: any
): Promise<IBlog | null> => {
  const isExist = await Blog.findOne({ _id: id });

  if (verifiedUser?.role === 'user' && isExist?.email !== verifiedUser?.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not allowed');
  }

  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Blog Not Found');
  }
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
