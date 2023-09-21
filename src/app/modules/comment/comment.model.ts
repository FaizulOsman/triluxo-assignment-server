import { Schema, model } from 'mongoose';
import { IComment, CommentModel } from './comment.interface';

// Comment Schema
const CommentSchema = new Schema<IComment, CommentModel>(
  {
    blogId: {
      type: String,
      required: [true, 'blogId is missing!'],
    },
    userName: {
      type: String,
      required: [true, 'userName is missing!'],
    },
    userEmail: {
      type: String,
      required: [true, 'userEmail is missing!'],
    },
    question: {
      type: String,
      required: [true, 'question is missing!'],
    },
    replies: [
      {
        name: {
          type: String,
          required: false,
        },
        email: {
          type: String,
          required: false,
        },
        reply: {
          type: String,
          required: false,
        },
      },
    ],
    likes: [
      {
        email: {
          type: String,
          required: false,
        },
        isLiked: {
          type: Boolean,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Comment = model<IComment, CommentModel>('Comment', CommentSchema);
