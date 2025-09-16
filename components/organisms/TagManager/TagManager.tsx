// components/organisms/TagForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminProtected from '@/components/templates/AdminProtected';
import Button from '@/components/atoms/Button';
import { SaveIcon, ArrowLeftIcon, LoadingSpinner } from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';

interface Tag {
  slug: string;
  name: string;
  description?: string;
}

interface TagFormProps {
  mode: 'create' | 'update';
}

const TagManager: React.FC<TagFormProps> = ({ mode }) => {
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

  // Load tag data for editing
  useEffect(() => {
    if (mode === 'update' && slug) {
      loadTagData();
    }
  }, [mode, slug]);

  const loadTagData = async () => {
    try {
      setLoadingData(true);
      const response = await apiFetch(`/api/tag/${slug}`);
      const tag = response as Tag;
      setFormData({
        name: tag.name || '',
        description: tag.description || ''
      });
    } catch (err) {
      console.error('Failed to load tag:', err);
      setError('Failed to load tag data');
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
      setError('Tag name is required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'update' && slug) {
        await apiFetch(`/api/tag/${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim() || undefined
          })
        });
        setSuccess('Tag updated successfully!');
      } else {
        await apiFetch('/api/tag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            description: formData.description.trim() || undefined
          })
        });
        setSuccess('Tag created successfully!');
      }

      // Redirect after success
      setTimeout(() => {
        router.push('/crud/tags');
      }, 1500);

    } catch (err) {
      console.error('Failed to save tag:', err);
      setError(mode === 'update' ? 'Failed to update tag' : 'Failed to create tag');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/crud/tags');
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-[color:rgb(var(--neutral-600))] mt-4 text-lg">Loading tag...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color:rgb(var(--neutral-50))] to-[color:rgb(var(--neutral-100))]">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
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
              Back to Tags
            </Button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-[var(--radius-full)] font-medium mb-4">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
              {mode === 'update' ? 'Edit Tag' : 'New Tag'}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[color:rgb(var(--neutral-900))] to-[color:rgb(var(--neutral-700))] bg-clip-text text-transparent mb-4">
              {mode === 'update' ? 'Update Tag' : 'Create Tag'}
            </h1>
            <p className="text-[color:rgb(var(--neutral-600))]">
              {mode === 'update' 
                ? 'Modify the tag information below'
                : 'Add a new tag to label your blog posts'
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
              {/* Tag Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[color:rgb(var(--neutral-700))] mb-2">
                  Tag Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:ring-2 focus:ring-[color:rgb(var(--secondary-500))] focus:border-transparent transition-all duration-200"
                  placeholder="Enter tag name..."
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
                  className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[color:rgb(var(--neutral-300))] focus:ring-2 focus:ring-[color:rgb(var(--secondary-500))] focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Enter tag description..."
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
                  variant="purple"
                  size="lg"
                  fullWidth
                  leftIcon={<SaveIcon className="w-5 h-5" />}
                  loading={loading}
                  loadingText={mode === 'update' ? 'Updating...' : 'Creating...'}
                >
                  {mode === 'update' ? 'Update Tag' : 'Create Tag'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagManager;
