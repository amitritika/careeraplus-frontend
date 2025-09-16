'use client';

import React from 'react';
import { Metadata } from 'next';
import AdminProtected from '@/components/templates/AdminProtected';
import BlogForm from '@/components/organisms/BlogForm';


export default function CreateBlogPage() {
  return (
    <AdminProtected>
      <BlogForm mode="create" />
    </AdminProtected>
  );
}