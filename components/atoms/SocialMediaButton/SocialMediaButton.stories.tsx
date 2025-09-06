import type { Meta, StoryObj } from '@storybook/react';
import SocialLoginButton from './SocialMediaButton';

const meta: Meta<typeof SocialLoginButton> = {
  title: 'Atoms/SocialLoginButton',
  component: SocialLoginButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable social login button component supporting multiple providers with different sizes and states.',
      },
    },
  },
  argTypes: {
    provider: {
      control: 'select',
      options: ['google', 'facebook', 'linkedin', 'twitter', 'github'],
      description: 'The social media provider for the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default stories for each provider
export const Google: Story = {
  args: {
    provider: 'google',
    size: 'md',
  },
};

export const Facebook: Story = {
  args: {
    provider: 'facebook',
    size: 'md',
  },
};

export const LinkedIn: Story = {
  args: {
    provider: 'linkedin',
    size: 'md',
  },
};

export const Twitter: Story = {
  args: {
    provider: 'twitter',
    size: 'md',
  },
};

export const GitHub: Story = {
  args: {
    provider: 'github',
    size: 'md',
  },
};

// Size variations
export const SmallSize: Story = {
  args: {
    provider: 'google',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    provider: 'google',
    size: 'lg',
  },
};

// State variations
export const Disabled: Story = {
  args: {
    provider: 'google',
    disabled: true,
  },
};

// Custom styling
export const CustomClass: Story = {
  args: {
    provider: 'linkedin',
    className: 'border-2 border-blue-500',
  },
};

// All providers showcase
export const AllProviders: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 gap-4 w-64">
      <SocialLoginButton {...args} provider="google" />
      <SocialLoginButton {...args} provider="facebook" />
      <SocialLoginButton {...args} provider="linkedin" />
      <SocialLoginButton {...args} provider="twitter" />
      <SocialLoginButton {...args} provider="github" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available social media providers',
      },
    },
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 gap-4 w-64">
      <SocialLoginButton {...args} provider="google" size="sm" />
      <SocialLoginButton {...args} provider="google" size="md" />
      <SocialLoginButton {...args} provider="google" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different button sizes',
      },
    },
  },
};
