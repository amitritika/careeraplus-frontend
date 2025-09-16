// app/crud/tags/create/page.tsx
'use client';

import React from 'react';
import AdminProtected from '@/components/templates/AdminProtected';
import TagForm from '@/components/organisms/TagManager';

export default function CreateTagPage() {
  return (
    <AdminProtected>
      <TagForm mode="create" />
    </AdminProtected>
  );
}
