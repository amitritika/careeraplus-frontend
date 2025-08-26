import type { StorybookConfig } from '@storybook/nextjs-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  framework: { name: '@storybook/nextjs-vite', options: {} },

  // ✅ Use two explicit patterns:
  //  - MDX files
  //  - *.stories.ts/tsx files
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(ts|tsx)',
  ],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  staticDirs: ['../public'],

  // docs: { autodocs: 'tag' },

  // ✅ Ensure Vite can resolve "@/..." like Next does
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': resolve(__dirname, '../'),
      // 👇 Prevent "expected app router to be mounted" by stubbing these in SB
      'next/navigation': resolve(__dirname, './mocks/next-navigation.ts'),
      'next/headers': resolve(__dirname, './mocks/next-headers.ts'),
    };

    // ✅ Make sure JSX runtime is pre-bundled to avoid odd import shapes
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      include: ['react', 'react-dom', 'react/jsx-runtime'],
    };

    return config;
  },

  // (Optional) Expose env for stories; remove if unused
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3000/api',
  }),
};

export default config;
