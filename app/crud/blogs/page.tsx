// app/crud/blogs/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdminProtected from '@/components/templates/AdminProtected';
import ListItem from '@/components/molecules/ListItem';
import Button from '@/components/atoms/Button';
import { PlusIcon, LoadingSpinner, RefreshIcon, SearchIcon, FilterIcon, CloseIcon } from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';
import { Blog, Category, Tag } from '@/types/blog';
import { BlogsResponse } from '@/types/blog';

export default function BlogsListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State with proper typing
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Get search params safely
  const pageParam = searchParams.get('page');
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  const searchParam = searchParams.get('search');

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  // Load blogs function with apiFetch
  const loadBlogs = useCallback(async (skipCount: number = 0, append: boolean = false): Promise<void> => {
    try {
      if (!append) {
        setLoading(true);
        setError('');
      } else {
        setLoadingMore(true);
      }

      console.log('Loading blogs...'); // Debug log

      let data: BlogsResponse | Blog[] | null = null;

      // Try direct /api/blogs first
      try {
        const response = await apiFetch('/api/blogs');
        console.log('Direct /api/blogs response:', response); // Debug log

        // Handle different response formats safely
        if (Array.isArray(response)) {
          // If response is directly an array of blogs
          const blogsArray = response as Blog[];
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
        } else if (response && typeof response === 'object' && 'items' in response) {
          // If response has items property
          const blogsArray = (response as any).items as Blog[];
          setBlogs(append ? prev => [...prev, ...blogsArray] : blogsArray);
          setTotalBlogs(blogsArray.length);
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
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
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

  // Handle blog deletion with apiFetch
  const handleDeleteBlog = async (blogSlug: string): Promise<void> => {
    try {
      // Using correct API endpoint /api/blog/:slug (singular blog)
      await apiFetch(`/api/blog/${blogSlug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Remove the deleted blog from state
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.slug !== blogSlug));
      setTotalBlogs(prev => prev - 1);
    } catch (err) {
      console.error('Error deleting blog:', err);
      throw err; // Re-throw to be handled by ListItem
    }
  };

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
    
    const newUrl = `/crud/blogs?${params.toString()}`;
    router.push(newUrl as any);
  };

  const handleSearch = (searchTerm: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    params.delete('page');
    
    const newUrl = `/crud/blogs?${params.toString()}`;
    router.push(newUrl as any);
  };

  const clearAllFilters = (): void => {
    const newUrl = '/crud/blogs';
    router.push(newUrl as any);
  };

  const retryLoad = (): void => {
    setError('');
    loadBlogs(skip, false);
  };

  const handleCreateNew = (): void => {
    router.push('/crud/blogs/create');
  };

  // Effects
  useEffect(() => {
    loadBlogs(skip, false);
  }, [skip, loadBlogs]);

  useEffect(() => {
    if (!loading) {
      loadCategoriesAndTags();
    }
  }, [loading, loadCategoriesAndTags]);

  const hasMore = blogs.length < totalBlogs;

  // Loading state
  if (loading && !loadingMore) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))] flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-[color:rgb(var(--neutral-600))] mt-4 text-lg">Loading blogs...</p>
          </div>
        </div>
      </AdminProtected>
    );
  }

  // Error state with empty blogs
  if (error && blogs.length === 0) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))] flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-[var(--radius-xl)] p-8 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Blogs</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                variant="red"
                size="md"
                leftIcon={<RefreshIcon className="w-4 h-4" />}
                onClick={retryLoad}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </AdminProtected>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))]">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-[var(--radius-full)] font-medium mb-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Admin Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[color:rgb(var(--neutral-900))] to-[color:rgb(var(--neutral-700))] bg-clip-text text-transparent mb-4">
              Manage Blogs
            </h1>
            <p className="text-lg text-[color:rgb(var(--neutral-600))] max-w-2xl mx-auto mb-6">
              Create, edit, and manage your blog posts with powerful CRUD operations
            </p>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<PlusIcon className="w-5 h-5" />}
              onClick={handleCreateNew}
            >
              Create New Blog
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            {/* Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const searchTerm = formData.get('search') as string;
                handleSearch(searchTerm);
              }}
              className="relative mb-6"
            >
              <input
                type="text"
                name="search"
                placeholder="Search blogs by title, content, or tags..."
                defaultValue={searchParam || ''}
                className="w-full px-6 py-4 pr-12 rounded-[var(--radius-xl)] border border-white/40 bg-white/80 backdrop-blur-sm text-[color:rgb(var(--neutral-800))] placeholder-[color:rgb(var(--neutral-500))] focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[color:rgb(var(--neutral-600))] hover:text-[color:rgb(var(--primary-600))] transition-colors duration-200"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </form>

            {/* Error Banner */}
            {error && blogs.length > 0 && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-[var(--radius-lg)] flex items-center justify-between">
                <p className="text-orange-800 text-sm">
                  <strong>Warning:</strong> Some features may not work properly: {error}
                </p>
                <Button
                  variant="ghost-orange"
                  size="sm"
                  onClick={retryLoad}
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Categories Filter */}
            {categories.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FilterIcon className="w-4 h-4 text-[color:rgb(var(--neutral-600))]" />
                  <span className="text-sm font-medium text-[color:rgb(var(--neutral-700))]">Filter by Category:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 8).map((category: Category) => (
                    <button
                      key={category.slug || category.name}
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
            )}

            {/* Active Filters */}
            {(categoryParam || tagParam || searchParam) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm font-medium text-[color:rgb(var(--neutral-700))]">Active filters:</span>
                {categoryParam && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-[var(--radius-full)] text-xs">
                    Category: {categoryParam}
                    <button onClick={() => handleCategoryFilter(categoryParam)}>
                      <CloseIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {tagParam && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-[var(--radius-full)] text-xs">
                    Tag: {tagParam}
                  </span>
                )}
                {searchParam && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-[var(--radius-full)] text-xs">
                    Search: {searchParam}
                    <button onClick={() => handleSearch('')}>
                      <CloseIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <Button
                  variant="ghost-red"
                  size="xs"
                  onClick={clearAllFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Blogs List */}
          <div className="max-w-6xl mx-auto">
            {blogs.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-[color:rgb(var(--neutral-900))] mb-6">
                  {page === 1 ? 'All Blogs' : `Page ${page}`}
                </h2>
                <div className="grid gap-6 mb-8">
                  {blogs.map((blog: Blog) => (
                    <ListItem
                        key={blog.slug}
                        item={blog}
                        itemType="blog"
                        showCategories={true}
                        onDelete={handleDeleteBlog}
/>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white border border-[color:rgb(var(--neutral-200))] rounded-[var(--radius-xl)] p-8 max-w-md mx-auto">
                  <p className="text-[color:rgb(var(--neutral-600))] mb-4">No blogs found</p>
                  {(categoryParam || tagParam || searchParam) ? (
                    <>
                      <p className="text-sm text-[color:rgb(var(--neutral-500))] mb-4">
                        Try adjusting your search terms or browse different categories.
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={clearAllFilters}
                      >
                        Clear Filters
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<PlusIcon className="w-4 h-4" />}
                      onClick={handleCreateNew}
                    >
                      Create Your First Blog
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && !error && (
              <div className="text-center mb-8">
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={loadMore}
                  loading={loadingMore}
                  loadingText="Loading more..."
                >
                  Load More Blogs
                </Button>
              </div>
            )}

            {/* Stats Footer */}
            {totalBlogs > 0 && (
              <div className="text-center">
                <p className="text-[color:rgb(var(--neutral-500))] text-sm">
                  Showing {blogs.length} of{' '}
                  <span className="font-semibold">{totalBlogs}</span> blogs
                  {(categoryParam || tagParam || searchParam) && (
                    <span className="text-[color:rgb(var(--neutral-400))]"> (filtered)</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminProtected>
  );
}
