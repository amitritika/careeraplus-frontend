// app/crud/categories/update/[slug]/page.tsx
'use client';

import React from 'react';
import AdminProtected from '@/components/templates/AdminProtected';
import CategoryForm from '@/components/organisms/CategoryManager';

export default function UpdateCategoryPage() {
  return (
    <AdminProtected>
      <CategoryForm mode="update" />
    </AdminProtected>
  );
}
