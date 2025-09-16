// components/molecules/BlogCard.tsx

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { formatDistanceToNow } from 'date-fns';
import parse from 'html-react-parser';
import { H3, BodyText } from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { ClockIcon, ArrowRightIcon, StarIcon } from '@/components/atoms/Icons';
import { Blog } from '@/types/blog';
import { API_BASE } from '@/lib/api';

interface BlogCardProps {
  blog: Blog;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  variant = 'default',
  className = ''
}) => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (blog.slug) {
      setImageSrc(`${API_BASE}/api/blog/photo/${encodeURIComponent(blog.slug)}`);
    } else {
      setImageSrc(null);
    }
  }, [blog.slug]);

  const getCategoryColors = (index: number) => {
    const variants = [
      { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
      { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
      { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
      { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
    ];
    return variants[index % variants.length];
  };

  // Helper function to safely render excerpt using div instead of BodyText
  const renderExcerpt = (excerpt: string | null | undefined, className: string = "") => {
    if (!excerpt || typeof excerpt !== 'string') {
      return (
        <div className={`text-gray-500 italic leading-relaxed text-base ${className}`}>
          No excerpt available...
        </div>
      );
    }

    return (
      <div className={`prose prose-sm max-w-none [&>*]:m-0 leading-relaxed text-base text-gray-600 ${className}`}>
        {parse(excerpt)}
      </div>
    );
  };

  const renderImage = () => {
    if (imageSrc) {
      return (
        <img
          src={imageSrc}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      );
    }
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">No Image</p>
        </div>
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <Link href={`/blogs/${blog.slug}` as Route}>
        <article className={`group cursor-pointer bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md p-6 ${className}`}>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.categories.slice(0, 2).map((category, index) => {
              const colors = getCategoryColors(index);
              return (
                <span
                  key={category._id}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}
                >
                  {category.name}
                </span>
              );
            })}
          </div>

          {/* Title */}
          <H3 className="mb-3 line-clamp-2 group-hover:text-[color:rgb(var(--primary-600))] transition-colors duration-200">
            {blog.title}
          </H3>

          {/* Excerpt with HTML parsing */}
          <div className="mb-4 line-clamp-2">
            {renderExcerpt(blog.excerpt)}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{formatDistanceToNow(new Date(blog.updatedAt))} ago</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/blogs/${blog.slug}` as Route}>
        <article className={`group cursor-pointer bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-xl overflow-hidden ${className}`}>
          {/* Featured Image */}
          <div className="relative aspect-video overflow-hidden">
            {renderImage()}
            {/* Featured Badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1 bg-[color:rgb(var(--primary-500))] text-white px-3 py-1 rounded-full text-sm font-medium">
                <StarIcon className="w-4 h-4" />
                <span>Featured</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.categories.slice(0, 3).map((category, index) => {
                const colors = getCategoryColors(index);
                return (
                  <span
                    key={category._id}
                    className={`px-3 py-1 text-sm font-medium rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}
                  >
                    {category.name}
                  </span>
                );
              })}
            </div>

            {/* Title */}
            <H3 className="mb-4 line-clamp-2 group-hover:text-[color:rgb(var(--primary-600))] transition-colors duration-200 text-2xl">
              {blog.title}
            </H3>

            {/* Excerpt with HTML parsing */}
            <div className="mb-6 line-clamp-3 text-lg">
              {renderExcerpt(blog.excerpt, "prose-lg text-lg")}
            </div>

            {/* Meta Info and Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{formatDistanceToNow(new Date(blog.updatedAt))} ago</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRightIcon />}
                className="group-hover:bg-[color:rgb(var(--primary-500))] shadow-lg"
              >
                Read Article
              </Button>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/blogs/${blog.slug}` as Route}>
      <article className={`group cursor-pointer bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg overflow-hidden ${className}`}>
        {/* Featured Image */}
        <div className="relative aspect-video overflow-hidden">
          {renderImage()}
        </div>

        <div className="p-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.categories.slice(0, 2).map((category, index) => {
              const colors = getCategoryColors(index);
              return (
                <span
                  key={category._id}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}
                >
                  {category.name}
                </span>
              );
            })}
          </div>

          {/* Title */}
          <H3 className="mb-3 line-clamp-2 group-hover:text-[color:rgb(var(--primary-600))] transition-colors duration-200">
            {blog.title}
          </H3>

          {/* Excerpt with HTML parsing */}
          <div className="mb-4 line-clamp-2">
            {renderExcerpt(blog.excerpt)}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{formatDistanceToNow(new Date(blog.updatedAt))} ago</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
