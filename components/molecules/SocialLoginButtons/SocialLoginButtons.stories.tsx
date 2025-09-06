import type { Meta, StoryObj } from '@storybook/react';
import SocialLoginButtons from './SocialLoginButtons';

const meta: Meta<typeof SocialLoginButtons> = {
  title: 'Molecules/SocialLoginButtons',
  component: SocialLoginButtons,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collection of social login buttons with configurable layouts and providers.',
      },
    },
  },
  argTypes: {
    providers: {
      control: 'multi-select',
      options: ['google', 'facebook', 'linkedin', 'twitter', 'github'],
      description: 'Array of social providers to display',
    },
    layout: {
      control: 'select',
      options: ['grid-2', 'grid-3', 'vertical', 'horizontal'],
      description: 'Layout arrangement of the buttons',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of all buttons',
    },
    onProviderClick: {
      action: 'provider-clicked',
      description: 'Callback when a provider button is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    providers: ['google', 'linkedin', 'facebook'],
    layout: 'grid-2',
    size: 'md',
  },
};

// Layout variations
export const Grid2Layout: Story = {
  args: {
    providers: ['google', 'facebook', 'linkedin', 'twitter'],
    layout: 'grid-2',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: '2-column grid layout',
      },
    },
  },
};

export const Grid3Layout: Story = {
  args: {
    providers: ['google', 'facebook', 'linkedin', 'twitter', 'github'],
    layout: 'grid-3',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: '3-column grid layout',
      },
    },
  },
};

export const VerticalLayout: Story = {
  args: {
    providers: ['google', 'linkedin', 'github'],
    layout: 'vertical',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical stack layout',
      },
    },
  },
};

export const HorizontalLayout: Story = {
  args: {
    providers: ['google', 'facebook'],
    layout: 'horizontal',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal row layout',
      },
    },
  },
};

// Provider variations
export const SingleProvider: Story = {
  args: {
    providers: ['google'],
    layout: 'vertical',
    size: 'md',
  },
};

export const TwoProviders: Story = {
  args: {
    providers: ['google', 'linkedin'],
    layout: 'horizontal',
    size: 'md',
  },
};

export const AllProviders: Story = {
  args: {
    providers: ['google', 'facebook', 'linkedin', 'twitter', 'github'],
    layout: 'grid-3',
    size: 'md',
  },
};

// Size variations
export const SmallButtons: Story = {
  args: {
    providers: ['google', 'linkedin', 'facebook'],
    layout: 'grid-2',
    size: 'sm',
  },
};

export const LargeButtons: Story = {
  args: {
    providers: ['google', 'linkedin'],
    layout: 'vertical',
    size: 'lg',
  },
};

// Real-world scenarios
export const LoginPage: Story = {
  args: {
    providers: ['google', 'linkedin', 'facebook'],
    layout: 'vertical',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Common configuration for login pages',
      },
    },
  },
};

export const SignupPage: Story = {
  args: {
    providers: ['google', 'linkedin'],
    layout: 'grid-2',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplified configuration for signup flows',
      },
    },
  },
};
