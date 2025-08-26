// .storybook/preview.ts
import '../app/globals.css';
import type { Preview } from '@storybook/react';
import React from 'react';
import { ToastProvider } from '../components/providers/ToastProvider';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    options: { storySort: { order: ['Overview','Foundations','Atoms','Molecules','Organisms','Templates'] } },
    a11y: { element: '#root' },
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#ffffff' },
        { name: 'Dark', value: '#0b1220' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="min-h-screen bg-white text-slate-900">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

export default preview;

