import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Click me' }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button size="sm">Small</Button>
      <Button>Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};
export const Disabled: Story = { args: { disabled: true } };

