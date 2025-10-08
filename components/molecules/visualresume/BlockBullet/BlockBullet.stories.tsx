// BlockBullet.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BlockBullet } from './BlockBullet';

const meta: Meta<typeof BlockBullet> = {
  title: 'Resume/BlockBullet',
  component: BlockBullet,
  args: {
    resumeType: 'fresher',
    template: 1,
    fac: 1,
    bg: '#0a74da',
    font: '#222',
    props: { name: 'Delivered 15% QoQ growth', height: 20, top: 100, line: true },
  },
  argTypes: {
    resumeType: { control: 'radio', options: ['fresher', 'pro', 'expert'] },
    template: { control: { type: 'number', min: 1, max: 5, step: 1 } },
    bg: { control: 'color' },
    font: { control: 'color' },
  },
};
export default meta;

type Story = StoryObj<typeof BlockBullet>;

export const Playground: Story = {};

export const AllTemplatesGrid: Story = {
  render: (args) => (
    <div style={{ position: 'relative', height: 600 }}>
      {[1,2,3,4,5].map((t) => (
        <BlockBullet key={t} {...args} template={t as any} props={{ ...args.props, top: 80 * t }} />
      ))}
    </div>
  ),
};
