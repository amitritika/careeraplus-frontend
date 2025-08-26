import type { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';
import Input from '@/components/atoms/Input';

const meta = { title: 'Molecules/FormField', component: FormField } satisfies Meta<typeof FormField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email',
    hint: 'We never share your email',
    children: <Input id="email" placeholder="you@domain.com" />
  }
};

export const WithError: Story = {
  args: {
    label: 'Password',
    htmlFor: 'pwd',
    error: 'Minimum 8 characters',
    children: <Input id="pwd" type="password" />
  }
};
