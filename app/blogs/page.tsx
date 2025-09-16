// app/blogs/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { H1, H2, BodyText } from '@/components/atoms/Typography';
import BlogCard from '@/components/molecules/BlogCard';
import Button from '@/components/atoms/Button';
import { SearchIcon, FilterIcon, LoadingSpinner, RefreshIcon, CloseIcon } from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';
import { Blog, Category, Tag } from '@/types/blog';
import { BlogsResponse } from '@/types/blog';

export default function BlogsPage(): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State with proper typing
  const [blogs, setBlogs] = useState<Blog[]>([]);
const [categories, setCategories] = useState<Category[]>([]);
const [tags, setTags] = useState<Tag[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string>('');

  // Get search params safely
  const pageParam = searchParams.get('page');
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  const searchParam = searchParams.get('search');

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  // SIMPLIFIED blog loading function
// CORRECTED loadBlogs function
const loadBlogs = useCallback(async (skipCount: number = 0, append: boolean = false): Promise<void> => {
  try {
    if (!append) {
      setLoading(true);
      setError('');
    } else {
      setLoadingMore(true);
    }

    console.log('Loading blogs...'); // Debug log

    // FIXED: Properly type the variable
    let data: BlogsResponse | Blog[] | null = null;

    // Try direct /api/blogs first
    try {
      const response = await apiFetch('/api/blogs');
      console.log('Direct /api/blogs response:', response); // Debug log
      
      // FIXED: Handle different response formats safely
      if (Array.isArray(response?.items)) {
        // If response is directly an array of blogs
        const blogsArray = response.items as Blog[];
        setBlogs(append ? prev => [...prev, ...blogsArray] : blogsArray);
        setTotalBlogs(blogsArray.length);
      } else if (response && typeof response === 'object' && 'blogs' in response) {
        // If response has blogs property
        const blogResponse = response as BlogsResponse;
        const blogsArray = blogResponse.blogs || [];
        
        setBlogs(append ? prev => [...prev, ...blogsArray] : blogsArray);
        setCategories(blogResponse.categories || []);
        setTags(blogResponse.tags || []);
        setTotalBlogs(blogResponse.size || blogsArray.length);
      } else {
        throw new Error('Invalid response format from /api/blogs');
      }
    } catch (directError) {
      console.log('Direct API failed, trying POST method...', directError);
      
      // Fallback to POST method
      const params = {
        limit,
        skip: skipCount,
        ...(categoryParam && { category: categoryParam }),
        ...(tagParam && { tag: tagParam }),
        ...(searchParam && { search: searchParam })
      };

      const postResponse = await apiFetch('/blogs-categories-tags', {
        method: 'POST',
        json: params
      });

      console.log('POST response:', postResponse); // Debug log

      if (postResponse && typeof postResponse === 'object' && 'blogs' in postResponse) {
        const blogResponse = postResponse as BlogsResponse;
        const blogsArray = blogResponse.blogs || [];
        
        setBlogs(append ? prev => [...prev, ...blogsArray] : blogsArray);
        setCategories(blogResponse.categories || []);
        setTags(blogResponse.tags || []);
        setTotalBlogs(blogResponse.size || blogsArray.length);
      } else {
        throw new Error('No valid response from POST endpoint');
      }
    }

  } catch (error) {
    console.error('Failed to load blogs:', error);
    setError('Unable to load blogs. Please check your connection and try again.');
    
    if (!append) {
      setBlogs([]);
      setCategories([]);
      setTags([]);
      setTotalBlogs(0);
    }
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
}, [categoryParam, tagParam, searchParam, limit]);


  // Load categories and tags separately
  const loadCategoriesAndTags = useCallback(async (): Promise<void> => {
  if (categories.length > 0 && tags.length > 0) return;

  try {
    // Load categories
    try {
      const categoriesResponse = await apiFetch('/api/categories');
      const categoriesArray = Array.isArray(categoriesResponse) 
        ? categoriesResponse 
        : (categoriesResponse?.categories || []);
      setCategories(categoriesArray);
    } catch (catError) {
      console.log('Failed to load categories:', catError);
    }

    // Load tags  
    try {
      const tagsResponse = await apiFetch('/api/tags');
      const tagsArray = Array.isArray(tagsResponse) 
        ? tagsResponse 
        : (tagsResponse?.tags || []);
      setTags(tagsArray);
    } catch (tagError) {
      console.log('Failed to load tags:', tagError);
    }
  } catch (error) {
    console.log('Failed to load categories and tags:', error);
  }
}, [categories.length, tags.length]);


  // Effects
  useEffect(() => {
    loadBlogs(skip, false);
  }, [skip, loadBlogs]);

  useEffect(() => {
    if (!loading) {
      loadCategoriesAndTags();
    }
  }, [loading, loadCategoriesAndTags]);

  // Event handlers
  const loadMore = (): void => {
    loadBlogs(blogs.length, true);
  };

  const handleCategoryFilter = (categorySlug: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryParam === categorySlug) {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    params.delete('page');
    router.push(`/blogs?${params.toString()}`);
  };

  const handleSearch = (searchTerm: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    params.delete('page');
    router.push(`/blogs?${params.toString()}`);
  };

  const clearAllFilters = (): void => {
    router.push('/blogs');
  };

  const retryLoad = (): void => {
    setError('');
    loadBlogs(skip, false);
  };

  const hasMore = blogs.length < totalBlogs;
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const regularBlogs = blogs.length > 0 ? blogs.slice(1) : [];

  if (loading && !loadingMore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <BodyText className="mt-4 text-[color:rgb(var(--neutral-600))]">Loading amazing stories...</BodyText>
          </div>
        </div>
      </div>
    );
  }

  if (error && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-[var(--radius-2xl)] border border-white/20 shadow-xl">
            <H2 className="text-[color:rgb(var(--error-600))] mb-4">Unable to Load Blogs</H2>
            <BodyText className="text-[color:rgb(var(--neutral-600))] mb-6">{error}</BodyText>
            <Button
              onClick={retryLoad}
              variant="primary"
              leftIcon={<RefreshIcon />}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements - REMOVED GRID DOTS */}
      <div className="absolute inset-0">
        {/* Gradient Orbs Only */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-[var(--radius-full)] border border-white/20 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">Fresh Content Updated Daily</BodyText>
            </div>
            
            <H1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Discover Amazing Stories
            </H1>
            
            <BodyText className="text-xl text-[color:rgb(var(--neutral-600))] max-w-2xl mx-auto leading-relaxed">
              Explore our collection of articles, tutorials, and insights from industry experts to accelerate your career growth
            </BodyText>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const searchTerm = formData.get('search') as string;
                handleSearch(searchTerm);
              }} className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="text-[color:rgb(var(--neutral-400))]" />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search articles, tutorials, and insights..."
                  defaultValue={searchParam || ''}
                  className="w-full pl-12 pr-32 py-4 bg-white/80 backdrop-blur-sm border border-white/20 rounded-[var(--radius-xl)] focus:bg-white focus:border-[color:rgb(var(--primary-300))] focus:ring-4 focus:ring-[color:rgb(var(--primary-600))]/10 transition-all duration-300 text-lg placeholder-[color:rgb(var(--neutral-400))] shadow-lg"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="absolute right-2 top-2 bottom-2"
                  leftIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </form>
            </div>

            {/* Error Banner */}
            {error && blogs.length > 0 && (
              <div className="max-w-4xl mx-auto mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-[var(--radius-xl)] p-4">
                <div className="flex items-center justify-between">
                  <BodyText className="text-red-700">Some features may not work properly: {error}</BodyText>
                  <Button
                    onClick={retryLoad}
                    variant="ghost-red"
                    size="sm"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* Categories Filter - FIXED ICON SIZE */}
            {categories.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-[var(--radius-2xl)] p-6 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <FilterIcon className="w-4 h-4 text-[color:rgb(var(--neutral-500))]" />
                    <BodyText className="font-semibold text-[color:rgb(var(--neutral-700))]">Filter by Category:</BodyText>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {categories.slice(0, 8).map((category: Category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryFilter(category.slug)}
                        className={`px-4 py-2 rounded-[var(--radius-full)] font-medium transition-all duration-200 ${
                          categoryParam === category.slug
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-white/80 text-[color:rgb(var(--neutral-700))] hover:bg-white hover:shadow-md border border-white/40'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters */}
            {(categoryParam || tagParam || searchParam) && (
              <div className="max-w-4xl mx-auto mt-6">
                <div className="flex items-center flex-wrap gap-3 justify-center">
                  <BodyText className="text-[color:rgb(var(--neutral-600))] font-medium">Active filters:</BodyText>
                  
                  {categoryParam && (
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-[var(--radius-full)] text-sm">
                      <span>Category: {categoryParam}</span>
                      <button onClick={() => handleCategoryFilter(categoryParam)}>
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {tagParam && (
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-[var(--radius-full)] text-sm">
                      <span>Tag: {tagParam}</span>
                      <button onClick={clearAllFilters}>
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {searchParam && (
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-[var(--radius-full)] text-sm">
                      <span>Search: {searchParam}</span>
                      <button onClick={() => handleSearch('')}>
                        <CloseIcon className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <Button
                    onClick={clearAllFilters}
                    variant="ghost-red"
                    size="sm"
                  >
                    Clear all
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Featured Blog */}
          {featuredBlog && page === 1 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-[var(--radius-full)] font-semibold">
                  ⭐ Featured Article
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <BlogCard blog={featuredBlog} variant="featured" />
              </div>
            </div>
          )}

          {/* Regular Blogs Grid */}
          <div className="mb-16">
            <H2 className="text-3xl font-bold text-center mb-12 text-[color:rgb(var(--neutral-800))]">
              {page === 1 ? 'Latest Articles' : `Page ${page}`}
            </H2>
            
            {regularBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularBlogs.map((blog: Blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            ) : !featuredBlog && !loading ? (
              <div className="text-center py-16">
                <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-[var(--radius-2xl)] p-12 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SearchIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <H2 className="text-[color:rgb(var(--neutral-600))] mb-4">No articles found</H2>
                  <BodyText className="text-[color:rgb(var(--neutral-500))] mb-6">
                    Try adjusting your search terms or browse different categories.
                  </BodyText>
                  {(categoryParam || tagParam || searchParam) && (
                    <Button onClick={clearAllFilters} variant="primary">
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Load More Button */}
          {hasMore && !error && (
            <div className="text-center mb-8">
              <Button
                onClick={loadMore}
                variant="primary"
                size="lg"
                loading={loadingMore}
                loadingText="Loading more articles..."
                className="shadow-xl"
              >
                Load More Articles
              </Button>
            </div>
          )}

          {/* Stats/Info Section */}
          {totalBlogs > 0 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-[var(--radius-full)] border border-white/20 shadow-lg">
                <BodyText className="text-[color:rgb(var(--neutral-600))]">
                  Showing <span className="font-semibold text-[color:rgb(var(--primary-600))]">{blogs.length}</span> of{' '}
                  <span className="font-semibold text-[color:rgb(var(--primary-600))]">{totalBlogs}</span> articles
                  {(categoryParam || tagParam || searchParam) && (
                    <span className="text-[color:rgb(var(--neutral-500))]"> (filtered)</span>
                  )}
                </BodyText>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
