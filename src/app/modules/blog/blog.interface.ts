import { Model } from 'mongoose';

export type IBlog = {
  imageUrl: string;
  videoUrl?: string;
  title: string;
  description: string;
  email: string;
  isPublished?: boolean;
};

// Blog Model
export type BlogModel = Model<IBlog, Record<string, unknown>>;

export type IBlogFilters = {
  searchTerm?: string;
  title?: string;
  description: string;
};
