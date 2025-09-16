// components/organisms/CategoryForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminProtected from '@/components/templates/AdminProtected';
import Button from '@/components/atoms/Button';
import { SaveIcon, ArrowLeftIcon, LoadingSpinner } from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';

interface Category {
  slug: string;
  name: string;
  description?: string;
}

interface CategoryFormProps {
  mode: 'create' | 'update';
}

const CategoryManager: React.FC<CategoryFormProps> = ({ mode }) => {
  const router = useRouter();
  const params = useParams();
  const slug = mode === 'update' ? params?.slug as string : null;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(mode === 'update');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load category data for editing
  useEffect(() => {
    if (mode === 'update' && slug) {
      loadCategoryData();
    }
  }, [mode, slug]);

  const loadCategoryData = async () => {
    try {
      setLoadingData(true);
      const response = await apiFetch(`/api/category/${slug}`);
      const category = response as Category;
      setFormData({
        name: category.name || '',
        description: category.description || ''
      });
    } catch (err) {
      console.error('Failed to load category:', err);
      setError('Failed to load category data');
    } finally {
      setLoadingData(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'update' && slug) {
        await apiFetch(`/api/category/${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim() || undefined
          })
        });
        setSuccess('Category updated successfully!');
      } else {
        await apiFetch('/api/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim() || undefined
          })
        });
        setSuccess('Category created successfully!');
      }

      // Redirect after success
      setTimeout(() => {
        router.push('/crud/categories');
      }, 1500);

    } catch (err) {
      console.error('Failed to save category:', err);
      setError(mode === 'update' ? 'Failed to update category' : 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/crud/categories');
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-[color:rgb(var(--neutral-600))] mt-4 text-lg">Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))]">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-4 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-green-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost-primary"
              size="sm"
              leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
              onClick={handleCancel}
            >
              Back to Categories
            </Button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-[var(--radius-full)] font-medium mb-4">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              {mode === 'update' ? 'Edit Category' : 'New Category'}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[color:rgb(var(--neutral-900))] to-[color:rgb(var(--neutral-700))] bg-clip-text text-transparent mb-4">
              {mode === 'update' ? 'Update Category' : 'Create Category'}
            </h1>
            <p className="text-[color:rgb(var(--neutral-600))]">
              {mode === 'update' 
                ? 'Modify the category information below'
                : 'Add a new category to organize your blog posts'
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[var(--radius-xl)] border border-[color:rgb(var(--neutral-200))] shadow-lg p-8">
            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[var(--radius-lg)] text-green-800">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-lg)] text-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[color:rgb(var(--neutral-700))] mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:ring-2 focus:ring-[color:rgb(var(--success-500))] focus:border-transparent transition-all duration-200"
                  placeholder="Enter category name..."
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-[color:rgb(var(--neutral-700))] mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:ring-2 focus:ring-[color:rgb(var(--success-500))] focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Enter category description..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="green"
                  size="lg"
                  fullWidth
                  leftIcon={<SaveIcon className="w-5 h-5" />}
                  loading={loading}
                  loadingText={mode === 'update' ? 'Updating...' : 'Creating...'}
                >
                  {mode === 'update' ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
