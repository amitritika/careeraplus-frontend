// app/crud/tags/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdminProtected from '@/components/templates/AdminProtected';
import ListItem from '@/components/molecules/ListItem';
import Button from '@/components/atoms/Button';
import { PlusIcon, LoadingSpinner, RefreshIcon, SearchIcon } from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';

interface Tag {
  slug: string;
  name: string;
  description?: string;
  blogCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function TagsListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State management
  const [tags, setTags] = useState<Tag[]>([]);
  const [totalTags, setTotalTags] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Get search params
  const searchParam = searchParams.get('search');

  // Load tags function
  const loadTags = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

      console.log('Loading tags...');

      // Try direct /api/tags first
      const response = await apiFetch('/api/tags');
      console.log('Tags API response:', response);

      // Handle different response formats
      if (Array.isArray(response)) {
        const tagsArray = response as Tag[];
        setTags(tagsArray);
        setTotalTags(tagsArray.length);
      } else if (response && typeof response === 'object' && 'tags' in response) {
        const tagsArray = response.tags || [];
        setTags(tagsArray);
        setTotalTags(response.total || tagsArray.length);
      } else {
        throw new Error('Invalid response format from /api/tags');
      }
    } catch (error) {
      console.error('Failed to load tags:', error);
      setError('Unable to load tags. Please check your connection and try again.');
      setTags([]);
      setTotalTags(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle tag deletion
  const handleDeleteTag = async (tagSlug: string): Promise<void> => {
    try {
      await apiFetch(`/api/tag/${tagSlug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Remove the deleted tag from state
      setTags(prevTags => prevTags.filter(tag => tag.slug !== tagSlug));
      setTotalTags(prev => prev - 1);
    } catch (err) {
      console.error('Error deleting tag:', err);
      throw err;
    }
  };

  // Event handlers
  const handleSearch = (searchTerm: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    
    const newUrl = `/crud/tags?${params.toString()}`;
    router.push(newUrl as any);
  };

  const clearSearch = (): void => {
    router.push('/crud/tags');
  };

  const retryLoad = (): void => {
    setError('');
    loadTags();
  };

  const handleCreateNew = (): void => {
   const newUrl = '/crud/tags/create';
    router.push(newUrl as any);
  };

  // Effects
  useEffect(() => {
    loadTags();
  }, [loadTags]);

  // Loading state
  if (loading) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))] flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-[color:rgb(var(--neutral-600))] mt-4 text-lg">Loading tags...</p>
          </div>
        </div>
      </AdminProtected>
    );
  }

  // Error state
  if (error && tags.length === 0) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))] flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-[var(--radius-xl)] p-8 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Tags</h2>
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
          <div className="absolute top-10 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-[var(--radius-full)] font-medium mb-4">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
              Tags Management
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[color:rgb(var(--neutral-900))] to-[color:rgb(var(--neutral-700))] bg-clip-text text-transparent mb-4">
              Manage Tags
            </h1>
            <p className="text-lg text-[color:rgb(var(--neutral-600))] max-w-2xl mx-auto mb-6">
              Label and categorize your content with tags. Create, edit, and manage blog tags.
            </p>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<PlusIcon className="w-5 h-5" />}
              onClick={handleCreateNew}
            >
              Create New Tag
            </Button>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto mb-8">
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
                placeholder="Search tags by name or description..."
                defaultValue={searchParam || ''}
                className="w-full px-6 py-4 pr-12 rounded-[var(--radius-xl)] border border-white/40 bg-white/80 backdrop-blur-sm text-[color:rgb(var(--neutral-800))] placeholder-[color:rgb(var(--neutral-500))] focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-200 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[color:rgb(var(--neutral-600))] hover:text-[color:rgb(var(--secondary-600))] transition-colors duration-200"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </form>

            {/* Active Search */}
            {searchParam && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-medium text-[color:rgb(var(--neutral-700))]">Active search:</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-[var(--radius-full)] text-xs">
                  Search: {searchParam}
                  <button onClick={() => handleSearch('')}>
                    <SearchIcon className="w-3 h-3" />
                  </button>
                </span>
                <Button
                  variant="ghost-red"
                  size="xs"
                  onClick={clearSearch}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>

          {/* Tags List */}
          <div className="max-w-6xl mx-auto">
            {tags.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-[color:rgb(var(--neutral-900))] mb-6">
                  All Tags
                </h2>
                <div className="grid gap-6 mb-8">
                  {tags.map((tag: Tag) => (
                    <ListItem
                      key={tag.slug}
                      item={tag}
                      itemType="tag"
                      onDelete={handleDeleteTag}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white border border-[color:rgb(var(--neutral-200))] rounded-[var(--radius-xl)] p-8 max-w-md mx-auto">
                  <p className="text-[color:rgb(var(--neutral-600))] mb-4">No tags found</p>
                  {searchParam ? (
                    <>
                      <p className="text-sm text-[color:rgb(var(--neutral-500))] mb-4">
                        Try adjusting your search terms.
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={clearSearch}
                      >
                        Clear Search
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<PlusIcon className="w-4 h-4" />}
                      onClick={handleCreateNew}
                    >
                      Create Your First Tag
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Stats Footer */}
            {totalTags > 0 && (
              <div className="text-center">
                <p className="text-[color:rgb(var(--neutral-500))] text-sm">
                  Showing {tags.length} of{' '}
                  <span className="font-semibold">{totalTags}</span> tags
                  {searchParam && (
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
