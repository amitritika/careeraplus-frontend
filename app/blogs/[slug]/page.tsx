// app/blogs/[slug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import parse from 'html-react-parser';
import { H1, BodyText } from '@/components/atoms/Typography';
import BlogCard from '@/components/molecules/BlogCard';
import Button from '@/components/atoms/Button';
import { 
  ArrowLeftIcon, 
  ShareIcon, 
  LoadingSpinner, 
  ClockIcon, 
  UserIcon,
  TagIcon,
  RefreshIcon 
} from '@/components/atoms/Icons';
import { apiFetch, API_BASE } from '@/lib/api';
import { Blog } from '@/types/blog';
import './blog-content.css';

export default function BlogDetailPage(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  
  // Fixed: Add proper type checking for slug parameter
  const slug = params?.slug as string | undefined;

  // State
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper function to get category colors
  const getCategoryColors = (index: number) => {
    const colorSets = [
      { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
      { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
      { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
      { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
    ];
    return colorSets[index % colorSets.length];
  };

  // Load blog data
  useEffect(() => {
    const loadBlog = async () => {
      // Fixed: Add proper validation for slug parameter
      if (!slug || typeof slug !== 'string') {
        setError('Invalid blog URL');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        // Use correct API endpoint /api/blog/:slug
        const response = await apiFetch(`/api/blog/${slug}`);
        
        if (response && typeof response === 'object') {
          setBlog(response as Blog);
          
          // Load related blogs if categories exist
          if (response.categories?.length > 0) {
            try {
              const categorySlug = response.categories[0].slug;
              const queryParams = new URLSearchParams({
                category: categorySlug,
                limit: '4'
              });
              
              const relatedResponse = await apiFetch(`/api/blogs?${queryParams.toString()}`);
              
              if (Array.isArray(relatedResponse)) {
                setRelatedBlogs(relatedResponse.filter((rb: Blog) => rb._id !== response._id));
              } else if (relatedResponse?.blogs) {
                setRelatedBlogs(relatedResponse.blogs.filter((rb: Blog) => rb._id !== response._id));
              }
            } catch (relatedError) {
              console.log('Failed to load related blogs:', relatedError);
            }
          }
        } else {
          throw new Error('Blog not found');
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
        setError('Unable to load blog post. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  // Handle share
  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt?.replace(/<[^>]*>/g, '') || 'Check out this article',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
        }
      }
    } else if (blog && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  // Parse HTML content safely
  const parseHtmlContent = (htmlContent: string) => {
    return parse(htmlContent, {
      replace: (domNode: any) => {
        if (domNode.name === 'iframe') {
          return (
            <div className="video-container">
              <iframe
                src={domNode.attribs.src}
                frameBorder="0"
                allowFullScreen
                title="Video content"
              />
            </div>
          );
        }
        return domNode;
      }
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[color:rgb(var(--surface-2))] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-[color:rgb(var(--text-secondary))]">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state or invalid slug
  if (error || !blog || !slug) {
    return (
      <div className="min-h-screen bg-[color:rgb(var(--surface-2))] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">📄</div>
          <H1 className="mb-4">Article Not Found</H1>
          <BodyText className="mb-6 text-[color:rgb(var(--text-secondary))]">
            {error || 'The article you\'re looking for doesn\'t exist or has been moved.'}
          </BodyText>
          <div className="flex gap-3 justify-center">
            <Button
              variant="secondary"
              leftIcon={<ArrowLeftIcon />}
              onClick={() => router.push('/blogs')}
            >
              Back to Articles
            </Button>
            {error && (
              <Button
                variant="primary"
                leftIcon={<RefreshIcon />}
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:rgb(var(--surface-2))]">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button
              variant="ghost-primary"
              leftIcon={<ArrowLeftIcon />}
              onClick={() => router.push('/blogs')}
              className="hover:bg-white/50"
            >
              Back to Articles
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.categories.map((category, index) => {
                  const colors = getCategoryColors(index);
                  return (
                    <span
                      key={category._id}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {category.name}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Title */}
            <H1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {blog.title}
            </H1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-[color:rgb(var(--text-secondary))] mb-6">
              
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(blog.updatedAt))} ago</span>
              </div>
              <Button
                variant="ghost-primary"
                size="sm"
                leftIcon={<ShareIcon />}
                onClick={handleShare}
              >
                Share
              </Button>
            </div>

            {/* Featured Image - Fixed: Only render if slug exists */}
            {blog.photo && slug && (
              <div className="mb-8 rounded-[var(--radius-2xl)] overflow-hidden shadow-lg">
                <img
                  src={`${API_BASE}/api/blog/photo/${slug}`}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover"
                  onError={(e) => {
                    // Fallback to blog.photo if API endpoint fails
                    const target = e.target as HTMLImageElement;
                    if (target.src !== blog.photo && blog.photo) {
                      target.src = blog.photo;
                    }
                  }}
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <article className="mb-12">
            <div className="bg-white rounded-[var(--radius-2xl)] shadow-lg p-8 md:p-12">
              <div className="blog-content prose prose-lg max-w-none">
                {blog.body ? parseHtmlContent(blog.body) : 
                 blog.excerpt ? parseHtmlContent(blog.excerpt) : 
                 'No content available'}
              </div>
            </div>
          </article>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <section className="mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-xl)] p-6 border border-white/40">
                <div className="flex items-center gap-2 mb-3">
                  <TagIcon className="w-4 h-4 text-[color:rgb(var(--primary-600))]" />
                  <span className="font-semibold text-[color:rgb(var(--text))]">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="px-3 py-1 bg-[color:rgb(var(--primary-600))]/10 text-[color:rgb(var(--primary-600))] rounded-full text-sm font-medium hover:bg-[color:rgb(var(--primary-600))]/20 transition-colors cursor-pointer"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[color:rgb(var(--text))] mb-2">
                  Related Articles
                </h2>
                <BodyText className="text-[color:rgb(var(--text-secondary))]">
                  Discover more content you might enjoy
                </BodyText>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.slice(0, 3).map((relatedBlog: Blog) => (
                  <BlogCard key={relatedBlog._id} blog={relatedBlog} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
