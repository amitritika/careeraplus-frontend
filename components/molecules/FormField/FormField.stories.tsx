import type { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';

// Mock Input component for the stories
const MockInput = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    className={`w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form field wrapper that provides consistent styling for labels, hints, and error messages.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the form field',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the form element this label is for',
    },
    hint: {
      control: 'text',
      description: 'Optional hint text to help users',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with input
export const Default: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email',
    children: <MockInput id="email" type="email" placeholder="Enter your email" />,
  },
};

// With hint
export const WithHint: Story = {
  args: {
    label: 'Password',
    htmlFor: 'password',
    hint: 'Must be at least 8 characters long',
    children: <MockInput id="password" type="password" placeholder="Enter your password" />,
  },
};

// With error
export const WithError: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email-error',
    error: 'Please enter a valid email address',
    children: <MockInput id="email-error" type="email" placeholder="Enter your email" className="border-red-500" />,
  },
};

// With both hint and error
export const WithHintAndError: Story = {
  args: {
    label: 'Password',
    htmlFor: 'password-error',
    hint: 'Must be at least 8 characters long',
    error: 'Password is too short',
    children: <MockInput id="password-error" type="password" placeholder="Enter your password" className="border-red-500" />,
  },
};

// Different input types
export const TextArea: Story = {
  args: {
    label: 'Message',
    htmlFor: 'message',
    hint: 'Tell us about yourself',
    children: <textarea id="message" rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Enter your message" />,
  },
};

export const SelectField: Story = {
  args: {
    label: 'Country',
    htmlFor: 'country',
    children: (
      <select id="country" className="w-full px-3 py-2 border border-slate-300 rounded-md">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </select>
    ),
  },
};

// Required field
export const RequiredField: Story = {
  args: {
    label: 'Full Name *',
    htmlFor: 'fullname',
    hint: 'Enter your first and last name',
    children: <MockInput id="fullname" type="text" placeholder="John Doe" required />,
  },
};

// Long label and hint
export const LongContent: Story = {
  args: {
    label: 'Emergency Contact Information',
    htmlFor: 'emergency',
    hint: 'Please provide the name and phone number of someone we can contact in case of an emergency. This person should be someone who is not living with you.',
    children: <MockInput id="emergency" type="text" placeholder="Contact details" />,
  },
};

// Multiple form fields
export const MultipleFields: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <FormField label="First Name" htmlFor="fname">
        <MockInput id="fname" type="text" placeholder="John" />
      </FormField>
      <FormField label="Last Name" htmlFor="lname">
        <MockInput id="lname" type="text" placeholder="Doe" />
      </FormField>
      <FormField label="Email" htmlFor="email-multi" hint="We'll never share your email">
        <MockInput id="email-multi" type="email" placeholder="john@example.com" />
      </FormField>
      <FormField label="Password" htmlFor="password-multi" error="Password must contain at least one number">
        <MockInput id="password-multi" type="password" placeholder="••••••••" className="border-red-500" />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple form fields in a form',
      },
    },
  },
};
