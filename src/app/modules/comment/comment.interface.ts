import { Model } from 'mongoose';

export type IReplies = {
  name: string;
  email: string;
  reply: string;
};

export type ILikes = {
  email: string;
  isLiked: boolean;
};

export type IComment = {
  blogId: string;
  userName: string;
  userEmail: string;
  question: string;
  replies?: IReplies[];
  likes?: ILikes[];
};

// Comment Model
export type CommentModel = Model<IComment, Record<string, unknown>>;

export type ICommentFilters = {
  searchTerm?: string;
  question?: string;
};
