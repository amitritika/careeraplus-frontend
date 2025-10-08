'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LinkIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  QuoteIcon
} from '@/components/atoms/Icons';
import Button from '@/components/atoms/Button';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  minimal?: boolean;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start typing...',
  className = '',
  minimal = false
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[color:rgb(var(--primary-600))] hover:underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton: React.FC<{
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title?: string;
  }> = ({ onClick, isActive = false, children, title }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-md transition-colors ${
        isActive
          ? 'bg-[color:rgb(var(--primary-100))] text-[color:rgb(var(--primary-700))]'
          : 'text-[color:rgb(var(--neutral-600))] hover:bg-[color:rgb(var(--neutral-100))]'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className={`border border-[color:rgb(var(--neutral-300))] rounded-[var(--radius-lg)] ${className}`}>
      {!minimal && (
        <div className="flex flex-wrap gap-1 p-3 border-b border-[color:rgb(var(--neutral-200))] bg-[color:rgb(var(--neutral-50))]">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <BoldIcon className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <ItalicIcon className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-8 bg-[color:rgb(var(--neutral-300))] mx-2" />

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeftIcon className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenterIcon className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRightIcon className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-8 bg-[color:rgb(var(--neutral-300))] mx-2" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            <QuoteIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>
      )}
      
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[120px] focus-within:outline-none"
      />
    </div>
  );
};

export default TiptapEditor;
