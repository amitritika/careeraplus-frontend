// components/molecules/ListItem.tsx
'use client';

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button'; // FIXED: Default import
import { EditIcon, DeleteIcon, ClockIcon, TagIcon, CategoryIcon, UserIcon } from '@/components/atoms/Icons';

// Define different item types
type ItemType = 'blog' | 'category' | 'tag';

// Define the base interface
interface BaseItem {
  slug: string;
  name?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Specific interfaces for each item type
interface BlogItem extends BaseItem {
  title: string;
  excerpt?: string;
  categories?: Category[];
}

interface CategoryItem extends BaseItem {
  name: string;
  description?: string;
  blogCount?: number;
}

interface TagItem extends BaseItem {
  name: string;
  description?: string;
  blogCount?: number;
}

interface Category {
  slug: string;
  name: string;
}

interface ListItemProps {
  item: BlogItem | CategoryItem | TagItem;
  itemType: ItemType;
  onDelete?: (slug: string) => void;
  showCategories?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  itemType,
  onDelete,
  showCategories = false
}) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add safety checks for item properties
  if (!item || !item.slug) {
    console.error('ListItem: Invalid item received', item);
    return null;
  }

  const getDisplayTitle = (): string => {
    switch (itemType) {
      case 'blog':
        return (item as BlogItem).title || 'Untitled Blog';
      case 'category':
      case 'tag':
        return (item as CategoryItem | TagItem).name || 'Unnamed Item';
      default:
        return 'Unknown Item';
    }
  };

  const getDisplayDescription = (): string | null => {
    switch (itemType) {
      case 'blog':
        return renderExcerpt((item as BlogItem).excerpt);
      case 'category':
      case 'tag':
        const categoryOrTag = item as CategoryItem | TagItem;
        return categoryOrTag.description || null;
      default:
        return null;
    }
  };

  const getItemIcon = () => {
    switch (itemType) {
      case 'blog':
        return <UserIcon className="w-3 h-3" />;
      case 'category':
        return <CategoryIcon className="w-3 h-3" />;
      case 'tag':
        return <TagIcon className="w-3 h-3" />;
      default:
        return <UserIcon className="w-3 h-3" />;
    }
  };

  const getUpdateRoute = (): string => {
    switch (itemType) {
      case 'blog':
        return `/crud/blogs/update/${item.slug}`;
      case 'category':
        return `/crud/categories/update/${item.slug}`;
      case 'tag':
        return `/crud/tags/update/${item.slug}`;
      default:
        return `/crud/${itemType}s/update/${item.slug}`;
    }
  };

  const getStatsText = (): string | null => {
    if (itemType === 'category' || itemType === 'tag') {
      const categoryOrTag = item as CategoryItem | TagItem;
      if (categoryOrTag.blogCount !== undefined) {
        return `${categoryOrTag.blogCount} blog${categoryOrTag.blogCount !== 1 ? 's' : ''}`;
      }
    }
    return null;
  };

  // Format date with safety checks
  const formatUpdateDate = (): string => {
    if (item.updatedAt) {
      try {
        return `Updated ${formatDistanceToNow(new Date(item.updatedAt))} ago`;
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Recently updated';
      }
    } else if (item.createdAt) {
      try {
        return `Created ${formatDistanceToNow(new Date(item.createdAt))} ago`;
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Recently created';
      }
    }
    return 'Date unknown';
  };

  const getCategoryColors = (index: number) => {
    const colorVariations = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-orange-100 text-orange-800 border-orange-200',
      'bg-pink-100 text-pink-800 border-pink-200',
    ];
    return colorVariations[index % colorVariations.length];
  };

  const renderExcerpt = (text?: string) => {
    if (!text) return null;
    const plainText = text.replace(/<[^>]*>/g, '');
    const truncated = plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
    return truncated;
  };

  // FIXED: Router type error with type assertion
  const handleEdit = () => {
    const route = getUpdateRoute();
    router.push(route as any);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(item.slug);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(`Error deleting ${itemType}:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const displayTitle = getDisplayTitle();
  const displayDescription = getDisplayDescription();
  const statsText = getStatsText();

  return (
    <>
      <div className="group relative bg-white rounded-[var(--radius-xl)] border border-[color:rgb(var(--neutral-200))] hover:border-[color:rgb(var(--neutral-300))] transition-all duration-300 hover:shadow-lg p-6">
        
        {/* Item Type Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-[var(--radius-full)] text-xs font-medium border capitalize ${
            itemType === 'blog' ? 'bg-blue-100 text-blue-800 border-blue-200' :
            itemType === 'category' ? 'bg-green-100 text-green-800 border-green-200' :
            'bg-purple-100 text-purple-800 border-purple-200'
          }`}>
            {getItemIcon()}
            {itemType}
          </span>
          
          {statsText && (
            <span className="text-xs text-[color:rgb(var(--neutral-500))] font-medium">
              {statsText}
            </span>
          )}
        </div>

        {/* Categories - Only for blogs */}
        {showCategories && itemType === 'blog' && (item as BlogItem).categories && (item as BlogItem).categories!.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(item as BlogItem).categories!.slice(0, 3).map((category, index) => {
              const colors = getCategoryColors(index);
              return (
                <span
                  key={category.slug || category.name}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-[var(--radius-full)] text-xs font-medium border ${colors}`}
                >
                  <TagIcon className="w-3 h-3" />
                  {category.name}
                </span>
              );
            })}
            {(item as BlogItem).categories!.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                +{(item as BlogItem).categories!.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-[color:rgb(var(--neutral-900))] mb-3 line-clamp-2 group-hover:text-[color:rgb(var(--primary-600))] transition-colors duration-200">
          {displayTitle}
        </h3>

        {/* Description/Excerpt */}
        {displayDescription && (
          <p className="text-[color:rgb(var(--neutral-600))] text-sm leading-relaxed mb-4 line-clamp-3">
            {displayDescription}
          </p>
        )}

        {/* Meta Info and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[color:rgb(var(--neutral-500))]">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              <span>{formatUpdateDate()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost-blue"
              size="sm"
              leftIcon={<EditIcon className="w-4 h-4" />}
              onClick={handleEdit}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              Edit
            </Button>
            <Button
              variant="ghost-red"
              size="sm"
              leftIcon={<DeleteIcon className="w-4 h-4" />}
              onClick={handleDeleteClick}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[var(--radius-xl)] p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-[color:rgb(var(--neutral-900))] mb-2">
              Confirm Deletion
            </h3>
            <p className="text-[color:rgb(var(--neutral-600))] mb-6">
              Are you sure you want to delete {itemType === 'blog' ? 'the blog' : `the ${itemType}`} "{displayTitle}"? This action cannot be undone.
              {(itemType === 'category' || itemType === 'tag') && statsText && (
                <span className="block mt-2 text-orange-600 text-sm">
                  Warning: This {itemType} is currently used by {statsText}.
                </span>
              )}
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="red"
                size="sm"
                onClick={handleConfirmDelete}
                loading={isDeleting}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListItem;
