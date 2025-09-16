import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdminProtected from '@/components/templates/AdminProtected';
import BlogForm from '@/components/organisms/BlogForm';
import { apiFetch } from '@/lib/api';

interface UpdateBlogPageProps {
  params: { slug: string };
}

export default async function UpdateBlogPage({ params }: UpdateBlogPageProps) {
  let blog;
  try {
    blog = await apiFetch(`/api/blog/${params.slug}`);
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    notFound();
  }
  if (!blog) notFound();

  return (
    <AdminProtected>
      {/* ✅ pass a normal element, not a function */}
      <BlogForm mode="edit" blog={blog} />
    </AdminProtected>
  );
}

export async function generateMetadata({ params }: UpdateBlogPageProps): Promise<Metadata> {
  try {
    const blog = await apiFetch(`/api/blog/${params.slug}`);
    return {
      title: blog ? `Edit: ${blog.title} | Admin` : 'Edit Article | Admin',
      description: blog ? `Edit article: ${blog.title}` : 'Edit blog article',
    };
  } catch {
    return { title: 'Edit Article | Admin', description: 'Edit blog article' };
  }
}
