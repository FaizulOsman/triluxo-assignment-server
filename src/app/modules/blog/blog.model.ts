import { Schema, model } from 'mongoose';
import { IBlog, BlogModel } from './blog.interface';

// Blog Schema
const BlogSchema = new Schema<IBlog, BlogModel>(
  {
    imageUrl: {
      type: String,
      required: [false, 'imageUrl is missing!'],
    },
    videoUrl: {
      type: String,
      required: [false, 'videoUrl is missing!'],
    },
    title: {
      type: String,
      required: [false, 'title is missing!'],
    },
    description: {
      type: String,
      required: [false, 'description is missing!'],
    },
    email: {
      type: String,
      required: [false, 'email is missing!'],
    },
    isPublished: {
      type: Boolean,
      required: [false, 'isPublished is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Blog = model<IBlog, BlogModel>('Blog', BlogSchema);
