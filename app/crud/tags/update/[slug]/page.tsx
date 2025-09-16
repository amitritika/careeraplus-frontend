// app/crud/tags/update/[slug]/page.tsx
'use client';

import React from 'react';
import AdminProtected from '@/components/templates/AdminProtected';
import TagForm from '@/components/organisms/TagManager';

export default function UpdateTagPage() {
  return (
    <AdminProtected>
      <TagForm mode="update" />
    </AdminProtected>
  );
}
