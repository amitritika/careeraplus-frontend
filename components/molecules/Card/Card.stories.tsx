import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import Button from '@/components/atoms/Button';

const meta = { title: 'Molecules/Card', component: Card } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    actions: <Button size="sm">Action</Button>,
    children: <p className="text-sm">Body content goes here.</p>
  }
};

export const NoHeader: Story = {
  args: { children: <p className="text-sm">Just body.</p> }
};
