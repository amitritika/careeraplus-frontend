import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  args: { placeholder: 'you@domain.com' }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'hello@example.com' } };
export const Password: Story = { args: { type: 'password', placeholder: '••••••••' } };
