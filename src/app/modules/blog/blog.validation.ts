import { z } from 'zod';

const createBlogZodValidation = z.object({
  body: z.object({
    imageUrl: z.string(),
    videoUrl: z.string().optional(),
    title: z.string(),
    description: z.string(),
    email: z.string(),
    isPublished: z.boolean().optional(),
  }),
});

const updateBlogZodValidation = z.object({
  body: z.object({
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    email: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidation = {
  createBlogZodValidation,
  updateBlogZodValidation,
};
