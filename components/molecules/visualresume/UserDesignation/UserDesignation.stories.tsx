import type { Meta, StoryObj } from '@storybook/react';
import { UserDesignation, type UserDesignationProps } from './UserDesignation';

const meta: Meta<typeof UserDesignation> = {
  title: 'Components/UserDesignation',
  component: UserDesignation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A consolidated UserDesignation component supporting 5 template variations with configurable styling and positioning.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions',
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variation (1-5)',
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color',
    },
    font: {
      control: { type: 'color' },
      description: 'Text color',
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family',
    },
    id: {
      control: { type: 'text' },
      description: 'HTML id attribute',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserDesignation>;

// Mock data for stories
const mockData = {
  height: 25,
  name: 'Senior Software Engineer',
  top: 50,
};

const mockDataLong = {
  height: 30,
  name: 'Principal Software Development Engineer',
  top: 75,
};

const mockDataShort = {
  height: 20,
  name: 'Developer',
  top: 25,
};

// Interactive controls story
export const Interactive: Story = {
  args: {
    fac: 1.5,
    props: mockData,
    template: 1,
    bg: '#f0f8ff',
    font: '#2c3e50',
    fontFamily: 'Arial, sans-serif',
    id: 'interactive-designation',
  },
};

// Individual template stories
export const Template1: Story = {
  args: {
    fac: 1.5,
    props: mockData,
    template: 1,
    bg: '#e8f4fd',
    font: '#1a365d',
    fontFamily: 'Arial, sans-serif',
  },
};

export const Template2: Story = {
  args: {
    fac: 1.5,
    props: mockData,
    template: 2,
    bg: '#f0fff4',
    font: '#22543d',
    fontFamily: 'Arial, sans-serif',
  },
};

export const Template3: Story = {
  args: {
    fac: 1.5,
    props: mockData,
    template: 3,
    bg: '#fffbf0',
    font: '#744210',
    fontFamily: 'Arial, sans-serif',
  },
};

export const Template4: Story = {
  args: {
    fac: 1.5,
    props: mockData,
    template: 4,
    bg: '#fef5e7',
    font: '#c05621',
    fontFamily: 'Arial, sans-serif',
  },
};

export const Template5: Story = {
  args: {
    fac: 1.5,
    props: mockData,
    template: 5,
    bg: '#f7fafc',
    font: '#2d3748',
    fontFamily: 'Arial, sans-serif',
  },
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const templates = [1, 2, 3, 4, 5] as const;
    const colors = ['#e8f4fd', '#f0fff4', '#fffbf0', '#fef5e7', '#f7fafc'];
    const textColors = ['#1a365d', '#22543d', '#744210', '#c05621', '#2d3748'];
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {templates.map((template, index) => (
          <div key={template} style={{ position: 'relative', width: '200px', height: '100px', border: '1px solid #ddd' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>Template {template}</h4>
            <UserDesignation
              fac={1.2}
              props={mockData}
              template={template}
              bg={colors[index]}
              font={textColors[index]}
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  },
};

// Responsive scaling story
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.8, 1.0, 1.2, 1.5, 2.0];
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ position: 'relative', width: '250px', height: '120px', border: '1px solid #ddd' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>Scale: {scale}x</h4>
            <UserDesignation
              fac={scale}
              props={mockData}
              template={1}
              bg="#f0f8ff"
              font="#2c3e50"
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  },
};

// Accessibility testing
export const AccessibilityTesting: Story = {
  render: () => {
    const variants = [
      { name: 'High Contrast', bg: '#000000', font: '#ffffff' },
      { name: 'Large Text', bg: '#f5f5f5', font: '#333333', fac: 2.5 },
      { name: 'Color Blind Safe', bg: '#e6f3ff', font: '#0056b3' },
    ];
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {variants.map((variant, index) => (
          <div key={index} style={{ position: 'relative', width: '300px', height: '150px', border: '1px solid #ddd' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>{variant.name}</h4>
            <UserDesignation
              fac={variant.fac || 1.5}
              props={mockData}
              template={1}
              bg={variant.bg}
              font={variant.font}
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  },
};

// Edge cases story
export const EdgeCases: Story = {
  render: () => {
    const cases = [
      { name: 'Long Text', data: mockDataLong },
      { name: 'Short Text', data: mockDataShort },
      { name: 'Minimal Scale', data: mockData, fac: 0.5 },
      { name: 'Maximum Scale', data: mockData, fac: 3.0 },
    ];
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {cases.map((testCase, index) => (
          <div key={index} style={{ position: 'relative', width: '300px', height: '150px', border: '1px solid #ddd' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>{testCase.name}</h4>
            <UserDesignation
              fac={testCase.fac || 1.5}
              props={testCase.data}
              template={1}
              bg="#f0f8ff"
              font="#2c3e50"
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  },
};

// Props validation story
export const PropsValidation: Story = {
  render: () => {
    const validationCases = [
      { name: 'Default Props', props: { fac: 1, props: mockData } },
      { name: 'Custom Styling', props: { fac: 1.5, props: mockData, bg: '#ff6b6b', font: '#ffffff', fontFamily: 'Georgia, serif' } },
      { name: 'Template 4 (Wide)', props: { fac: 1.5, props: mockData, template: 4 as const } },
      { name: 'With ID & Class', props: { fac: 1.2, props: mockData, id: 'test-id', className: 'test-class' } },
    ];
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {validationCases.map((testCase, index) => (
          <div key={index} style={{ position: 'relative', width: '250px', height: '120px', border: '1px solid #ddd' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>{testCase.name}</h4>
            <UserDesignation {...testCase.props} />
          </div>
        ))}
      </div>
    );
  },
};
