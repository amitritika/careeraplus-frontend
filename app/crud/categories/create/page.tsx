// app/crud/categories/create/page.tsx
'use client';

import React from 'react';
import AdminProtected from '@/components/templates/AdminProtected';
import CategoryForm from '@/components/organisms/CategoryManager';

export default function CreateCategoryPage() {
  return (
    <AdminProtected>
      <CategoryForm mode="create" />
    </AdminProtected>
  );
}
