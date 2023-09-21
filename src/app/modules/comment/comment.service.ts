/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IComment, ICommentFilters } from './comment.interface';
import { Comment } from './comment.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { commentSearchableFields } from './comment.constants';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Comment
const createComment = async (payload: IComment): Promise<IComment | null> => {
  const result = await Comment.create(payload);
  return result;
};

// Get All Comments (can also filter)
const getAllComments = async (
  filters: ICommentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IComment[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: commentSearchableFields?.map(field => ({
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

  const result = await Comment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Comment.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Comment
const getSingleComment = async (id: string): Promise<IComment | null> => {
  const result = await Comment.findById(id);

  return result;
};

const updateComment = async (
  id: string,
  payload: Partial<IComment>
): Promise<IComment | null> => {
  const isExist = await Comment.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comment not found');
  }

  const result = await Comment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Comment
const deleteComment = async (id: string): Promise<IComment | null> => {
  const result = await Comment.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Comment Not Found');
  }
  return result;
};

export const CommentService = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
