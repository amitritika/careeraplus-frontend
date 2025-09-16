'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import Button from '@/components/atoms/Button';
import Card from '@/components/molecules/Card';
import { 
  SaveIcon, 
  PublishIcon, 
  ImageIcon, 
  LoadingSpinner, 
  ArrowLeftIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListIcon,
  QuoteIcon
} from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';
import { useToast } from '@/components/providers/ToastProvider';

interface Category {
  _id: string;
  name: string;
}

interface Tag {
  _id: string;
  name: string;
}

interface BlogFormProps {
  blog?: any;
  mode: 'create' | 'edit';
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, mode }) => {
  const router = useRouter();
  const { show } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    selectedCategories: blog?.categories?.map((c: any) => c._id) || [],
    selectedTags: blog?.tags?.map((t: any) => t._id) || [],
    photo: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // TipTap Editor with SSR fix
  const editor = useEditor({
    immediatelyRender: false, // ✅ This fixes the SSR error
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Start writing your amazing article...',
        emptyEditorClass: 'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-mauve-11 before:opacity-50 before-pointer-events-none',
      }),
    ],
    content: blog?.body || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      // Auto-save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('blog_draft', JSON.stringify(content));
      }
    },
  });

  useEffect(() => {
    loadCategoriesAndTags();
    
    // Load blog content from localStorage if creating new blog
    if (mode === 'create' && editor) {
      const savedContent = localStorage.getItem('blog_draft');
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          editor.commands.setContent(parsedContent);
        } catch (error) {
          console.error('Error loading saved content:', error);
        }
      }
    }
  }, [mode, editor]);

  const loadCategoriesAndTags = async (): Promise<void> => {
    try {
      const [categoriesData, tagsData] = await Promise.all([
        apiFetch('/api/categories'),
        apiFetch('/api/tags')
      ]);
      setCategories(categoriesData as Category[]);
      setTags(tagsData as Tag[]);
    } catch (error: any) {
      console.error('Failed to load categories and tags:', error);
      show({ 
        type: 'error', 
        title: 'Error', 
        description: 'Failed to load categories and tags' 
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!editor?.getHTML() || editor.getText().trim().length === 0) {
      newErrors.body = 'Content is required';
    }
    
    if (formData.selectedCategories.length === 0) {
      newErrors.categories = 'Select at least one category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('body', editor?.getHTML() || '');
      submitFormData.append('categories', JSON.stringify(formData.selectedCategories));
      submitFormData.append('tags', JSON.stringify(formData.selectedTags));
      
      if (formData.photo) {
        submitFormData.append('photo', formData.photo);
      }

      if (mode === 'create') {
        await apiFetch('/api/blog', {
          method: 'POST',
          body: submitFormData,
        });
        localStorage.removeItem('blog_draft');
        show({ 
          type: 'success', 
          title: 'Success!', 
          description: 'Article published successfully!' 
        });
      } else {
        await apiFetch(`/api/blog/${blog?.slug}`, {
          method: 'PUT',
          body: submitFormData,
        });
        show({ 
          type: 'success', 
          title: 'Success!', 
          description: 'Article updated successfully!' 
        });
      }

      router.push('/admin/blogs' as Route);
    } catch (error: any) {
      console.error('Failed to save blog:', error);
      const errorMessage = error.message || 'Failed to save article';
      setErrors({ submit: errorMessage });
      show({ 
        type: 'error', 
        title: 'Error', 
        description: errorMessage 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryId: string): void => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id: string) => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  const toggleTag = (tagId: string): void => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter((id: string) => id !== tagId)
        : [...prev.selectedTags, tagId]
    }));
  };

  const addImage = (): void => {
    const url = window.prompt('Enter image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = (): void => {
    const url = window.prompt('Enter URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleBack = (): void => {
    router.back();
  };

  const handleCancel = (): void => {
    router.push('/admin/blogs' as Route);
  };

  // Show loading while editor is being initialized
  if (!editor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-[color:rgb(var(--neutral-600))]">
            Loading editor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"></div>

      {/* Grid Pattern - Fixed */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.03) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline-primary"
              size="sm"
              leftIcon={<ArrowLeftIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[color:rgb(var(--primary-600))] to-[color:rgb(var(--secondary-600))] bg-clip-text text-transparent mb-4">
            {mode === 'create' ? 'Create New Article' : 'Edit Article'}
          </h1>
          <p className="text-[color:rgb(var(--neutral-600))] text-lg max-w-2xl mx-auto">
            {mode === 'create' 
              ? 'Share your thoughts and insights with the world' 
              : 'Update your article content and settings'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-lg)] text-red-700">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.submit}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title Input */}
              <Card className="p-6 bg-white/50 backdrop-blur-sm border border-[color:rgb(var(--neutral-300))]">
                <div>
                  <label className="block text-sm font-semibold text-[color:rgb(var(--neutral-700))] mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setFormData(prev => ({ ...prev, title: e.target.value }))
                    }
                    className={`w-full px-4 py-3 rounded-[var(--radius-lg)] border ${
                      errors.title
                        ? 'border-[color:rgb(var(--error-500))] focus:ring-[color:rgb(var(--error-500))]'
                        : 'border-[color:rgb(var(--neutral-300))] focus:ring-[color:rgb(var(--primary-600))]'
                    } focus:ring-4 focus:ring-opacity-10 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                    placeholder="Enter your article title..."
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.title}
                    </p>
                  )}
                </div>
              </Card>

              {/* Content Editor */}
              <Card className="p-6 bg-white/50 backdrop-blur-sm border border-[color:rgb(var(--neutral-300))]">
                <div>
                  <label className="block text-sm font-semibold text-[color:rgb(var(--neutral-700))] mb-2">
                    Article Content *
                  </label>
                  
                  {/* Toolbar */}
                  <div className="bg-white/70 backdrop-blur-sm border border-[color:rgb(var(--neutral-300))] rounded-t-[var(--radius-lg)] p-3 flex flex-wrap gap-1">
                    {/* Text Formatting */}
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive('bold') 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Bold"
                    >
                      <BoldIcon className="w-4 h-4" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive('italic') 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Italic"
                    >
                      <ItalicIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-[color:rgb(var(--neutral-300))] mx-1"></div>

                    {/* Headings */}
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                      className={`px-3 py-2 rounded transition-colors text-sm font-medium ${
                        editor.isActive('heading', { level: 1 }) 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Heading 1"
                    >
                      H1
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`px-3 py-2 rounded transition-colors text-sm font-medium ${
                        editor.isActive('heading', { level: 2 }) 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Heading 2"
                    >
                      H2
                    </button>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                      className={`px-3 py-2 rounded transition-colors text-sm font-medium ${
                        editor.isActive('heading', { level: 3 }) 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Heading 3"
                    >
                      H3
                    </button>

                    <div className="w-px h-6 bg-[color:rgb(var(--neutral-300))] mx-1"></div>

                    {/* Lists */}
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive('bulletList') 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Bullet List"
                    >
                      <ListIcon className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive('orderedList') 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Numbered List"
                    >
                      <span className="text-xs font-bold">1.</span>
                    </button>

                    <div className="w-px h-6 bg-[color:rgb(var(--neutral-300))] mx-1"></div>

                    {/* Quote */}
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBlockquote().run()}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive('blockquote') 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Quote"
                    >
                      <QuoteIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-[color:rgb(var(--neutral-300))] mx-1"></div>

                    {/* Media */}
                    <button
                      type="button"
                      onClick={addImage}
                      className="p-2 rounded transition-colors hover:bg-[color:rgb(var(--neutral-100))]"
                      title="Add Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={addLink}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive('link') 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Add Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-[color:rgb(var(--neutral-300))] mx-1"></div>

                    {/* Alignment */}
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().setTextAlign('left').run()}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive({ textAlign: 'left' }) 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Align Left"
                    >
                      <AlignLeftIcon className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().setTextAlign('center').run()}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive({ textAlign: 'center' }) 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Align Center"
                    >
                      <AlignCenterIcon className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => editor.chain().focus().setTextAlign('right').run()}
                      className={`p-2 rounded transition-colors ${
                        editor.isActive({ textAlign: 'right' }) 
                          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-600))]' 
                          : 'hover:bg-[color:rgb(var(--neutral-100))]'
                      }`}
                      title="Align Right"
                    >
                      <AlignRightIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Editor */}
                  <div className="bg-white/70 backdrop-blur-sm border border-t-0 border-[color:rgb(var(--neutral-300))] rounded-b-[var(--radius-lg)] min-h-[400px]">
                    <EditorContent 
                      editor={editor} 
                      className="prose prose-lg max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[400px] [&_.ProseMirror]:p-4"
                    />
                  </div>
                  
                  {errors.body && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.body}
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image */}
              <Card className="p-6 bg-white/50 backdrop-blur-sm border border-[color:rgb(var(--neutral-300))]">
                <h3 className="text-lg font-semibold text-[color:rgb(var(--neutral-800))] mb-4">
                  Featured Image
                </h3>
                <div className="border-2 border-dashed border-[color:rgb(var(--neutral-300))] rounded-[var(--radius-lg)] p-6 text-center hover:border-[color:rgb(var(--primary-400))] transition-colors">
                  <ImageIcon className="w-8 h-8 text-[color:rgb(var(--neutral-400))] mx-auto mb-2" />
                  <p className="text-sm text-[color:rgb(var(--neutral-600))] mb-4">
                    Drag & drop an image or click to browse
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setFormData(prev => ({
                        ...prev,
                        photo: e.target.files?.[0] || null
                      }))
                    }
                    className="hidden"
                    id="featured-image"
                  />
                  <label
                    htmlFor="featured-image"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-[color:rgb(var(--primary-600))] text-white rounded-[var(--radius-md)] hover:bg-[color:rgb(var(--primary-500))] transition-colors"
                  >
                    Choose Image
                  </label>
                  {formData.photo && (
                    <p className="mt-2 text-sm text-[color:rgb(var(--success-600))] flex items-center justify-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Selected: {formData.photo.name}
                    </p>
                  )}
                </div>
              </Card>

              {/* Categories */}
              <Card className="p-6 bg-white/50 backdrop-blur-sm border border-[color:rgb(var(--neutral-300))]">
                <h3 className="text-lg font-semibold text-[color:rgb(var(--neutral-800))] mb-4">
                  Categories *
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((category: Category) => (
                    <label key={category._id} className="flex items-center p-2 hover:bg-[color:rgb(var(--neutral-50))] rounded-[var(--radius-md)] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.selectedCategories.includes(category._id)}
                        onChange={() => toggleCategory(category._id)}
                        className="w-4 h-4 text-[color:rgb(var(--primary-600))] border-[color:rgb(var(--neutral-300))] rounded focus:ring-[color:rgb(var(--primary-500))]"
                      />
                      <span className="ml-3 text-sm text-[color:rgb(var(--neutral-700))]">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.categories && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.categories}
                  </p>
                )}
              </Card>

              {/* Tags */}
              <Card className="p-6 bg-white/50 backdrop-blur-sm border border-[color:rgb(var(--neutral-300))]">
                <h3 className="text-lg font-semibold text-[color:rgb(var(--neutral-800))] mb-4">
                  Tags
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tags.map((tag: Tag) => (
                    <label key={tag._id} className="flex items-center p-2 hover:bg-[color:rgb(var(--neutral-50))] rounded-[var(--radius-md)] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.selectedTags.includes(tag._id)}
                        onChange={() => toggleTag(tag._id)}
                        className="w-4 h-4 text-[color:rgb(var(--primary-600))] border-[color:rgb(var(--neutral-300))] rounded focus:ring-[color:rgb(var(--primary-500))]"
                      />
                      <span className="ml-3 text-sm text-[color:rgb(var(--neutral-700))]">
                        {tag.name}
                      </span>
                    </label>
                  ))}
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-6 bg-white/50 backdrop-blur-sm border border-[color:rgb(var(--neutral-300))]">
                <div className="space-y-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    loadingText={mode === 'create' ? 'Publishing...' : 'Updating...'}
                    leftIcon={<PublishIcon />}
                  >
                    {mode === 'create' ? 'Publish Article' : 'Update Article'}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
