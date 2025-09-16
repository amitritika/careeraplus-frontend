// types/blog.ts
import { ReactNode } from 'react';

// Add JSX namespace declaration if needed
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
  }
}

export interface Author {
  _id: string;
  name: string;
  username?: string;
  email?: string;
  avatar?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  photo?: string;
  postedBy: Author;
  categories: Category[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  readTime?: number;
  isPublished?: boolean;
}

// Fix the BlogsResponse interface to match actual API response
export interface BlogsResponse {
  blogs: Blog[];
  categories: Category[];
  tags: Tag[];
  size: number; // This is the total count of blogs
}

export interface ApiError {
  error: string;
  message?: string;
}

export interface LoadBlogsParams {
  limit: number;
  skip: number;
  category?: string;
  tag?: string;
  search?: string;
}
