// LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    // Add this for components using next/navigation
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component: 'Complete login form with email/password authentication and social login options.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
    nextjs: {
      appDirectory: true,
    },
  },
};
