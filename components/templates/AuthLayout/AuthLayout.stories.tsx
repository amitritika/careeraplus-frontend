import type { Meta, StoryObj } from '@storybook/react';
import AuthLayout from './AuthLayout';
import LoginForm from '@/components/organisms/LoginForm';

const meta = { title: 'Templates/AuthLayout', component: AuthLayout } satisfies Meta<typeof AuthLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithLoginForm: Story = {
  args: { title: 'Welcome back', children: <LoginForm /> }
};
