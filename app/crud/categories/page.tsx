// app/crud/categories/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdminProtected from '@/components/templates/AdminProtected';
import ListItem from '@/components/molecules/ListItem';
import Button from '@/components/atoms/Button';
import { PlusIcon, LoadingSpinner, RefreshIcon, SearchIcon } from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';

interface Category {
  slug: string;
  name: string;
  description?: string;
  blogCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function CategoriesListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State management
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Get search params
  const searchParam = searchParams.get('search');

  // Load categories function
  const loadCategories = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

      console.log('Loading categories...');

      // Try direct /api/categories first
      const response = await apiFetch('/api/categories');
      console.log('Categories API response:', response);

      // Handle different response formats
      if (Array.isArray(response)) {
        const categoriesArray = response as Category[];
        setCategories(categoriesArray);
        setTotalCategories(categoriesArray.length);
      } else if (response && typeof response === 'object' && 'categories' in response) {
        const categoriesArray = response.categories || [];
        setCategories(categoriesArray);
        setTotalCategories(response.total || categoriesArray.length);
      } else {
        throw new Error('Invalid response format from /api/categories');
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      setError('Unable to load categories. Please check your connection and try again.');
      setCategories([]);
      setTotalCategories(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle category deletion
  const handleDeleteCategory = async (categorySlug: string): Promise<void> => {
    try {
      await apiFetch(`/api/category/${categorySlug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Remove the deleted category from state
      setCategories(prevCategories => prevCategories.filter(category => category.slug !== categorySlug));
      setTotalCategories(prev => prev - 1);
    } catch (err) {
      console.error('Error deleting category:', err);
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
    
    const newUrl = `/crud/categories?${params.toString()}`;
    router.push(newUrl as any);
  };

  const clearSearch = (): void => {
    const newUrl = '/crud/categories';
    router.push(newUrl as any);
  };

  const retryLoad = (): void => {
    setError('');
    loadCategories();
  };

  const handleCreateNew = (): void => {
    const newUrl = '/crud/categories/create';
    router.push(newUrl as any);
  };

  // Effects
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Loading state
  if (loading) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))] flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-[color:rgb(var(--neutral-600))] mt-4 text-lg">Loading categories...</p>
          </div>
        </div>
      </AdminProtected>
    );
  }

  // Error state
  if (error && categories.length === 0) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))] flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-[var(--radius-xl)] p-8 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Categories</h2>
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
          <div className="absolute top-10 -left-4 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-green-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-[var(--radius-full)] font-medium mb-4">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              Categories Management
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[color:rgb(var(--neutral-900))] to-[color:rgb(var(--neutral-700))] bg-clip-text text-transparent mb-4">
              Manage Categories
            </h1>
            <p className="text-lg text-[color:rgb(var(--neutral-600))] max-w-2xl mx-auto mb-6">
              Organize your content with categories. Create, edit, and manage blog categories.
            </p>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<PlusIcon className="w-5 h-5" />}
              onClick={handleCreateNew}
            >
              Create New Category
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
                placeholder="Search categories by name or description..."
                defaultValue={searchParam || ''}
                className="w-full px-6 py-4 pr-12 rounded-[var(--radius-xl)] border border-white/40 bg-white/80 backdrop-blur-sm text-[color:rgb(var(--neutral-800))] placeholder-[color:rgb(var(--neutral-500))] focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-400 transition-all duration-200 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[color:rgb(var(--neutral-600))] hover:text-[color:rgb(var(--success-600))] transition-colors duration-200"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </form>

            {/* Active Search */}
            {searchParam && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-medium text-[color:rgb(var(--neutral-700))]">Active search:</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-[var(--radius-full)] text-xs">
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

          {/* Categories List */}
          <div className="max-w-6xl mx-auto">
            {categories.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-[color:rgb(var(--neutral-900))] mb-6">
                  All Categories
                </h2>
                <div className="grid gap-6 mb-8">
                  {categories.map((category: Category) => (
                    <ListItem
                      key={category.slug}
                      item={category}
                      itemType="category"
                      onDelete={handleDeleteCategory}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white border border-[color:rgb(var(--neutral-200))] rounded-[var(--radius-xl)] p-8 max-w-md mx-auto">
                  <p className="text-[color:rgb(var(--neutral-600))] mb-4">No categories found</p>
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
                      Create Your First Category
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Stats Footer */}
            {totalCategories > 0 && (
              <div className="text-center">
                <p className="text-[color:rgb(var(--neutral-500))] text-sm">
                  Showing {categories.length} of{' '}
                  <span className="font-semibold">{totalCategories}</span> categories
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
