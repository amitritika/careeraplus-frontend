import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  args: { children: 'New' }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
