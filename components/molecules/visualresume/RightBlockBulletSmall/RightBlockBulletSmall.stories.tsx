import type { Meta, StoryObj } from '@storybook/react';
import RightBlockBulletSmall from './RightBlockBulletSmall';
import type { RightBlockBulletSmallProps } from './RightBlockBulletSmall';

const meta: Meta<typeof RightBlockBulletSmall> = {
  title: 'Components/RightBlockBulletSmall',
  component: RightBlockBulletSmall,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A consolidated bullet component supporting 5 template variations with different line elements and positioning.',
      },
    },
  },
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
      description: 'Background color for bullet and line elements',
    },
    font: {
      control: { type: 'color' },
      description: 'Text color',
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family for text content',
    },
    id: {
      control: { type: 'text' },
      description: 'HTML element ID',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof RightBlockBulletSmall>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for testing
const mockBulletData = {
  height: 20,
  top: 10,
  name: 'Sample bullet point with <strong>bold text</strong> and <em>italics</em>',
  line: true,
};

const mockBulletDataLong = {
  height: 40,
  top: 15,
  name: 'This is a longer bullet point that demonstrates how the component handles extended content with multiple lines and various <i class="fa fa-star"></i> formatting elements',
  line: true,
};

// Individual Template Stories
export const Template1: Story = {
  args: {
    fac: 1,
    template: 1,
    props: mockBulletData,
    bg: '#333333',
    font: '#000000',
    fontFamily: 'Arial, sans-serif',
  },
};

export const Template2: Story = {
  args: {
    fac: 1,
    template: 2,
    props: mockBulletData,
    bg: '#666666',
    font: '#333333',
    fontFamily: 'Georgia, serif',
  },
};

export const Template3: Story = {
  args: {
    fac: 1,
    template: 3,
    props: mockBulletData,
    bg: '#0066cc',
    font: '#000000',
    fontFamily: 'Helvetica, sans-serif',
  },
};

export const Template4: Story = {
  args: {
    fac: 1,
    template: 4,
    props: mockBulletData,
    bg: '#cc6600',
    font: '#2c3e50',
    fontFamily: 'Times, serif',
  },
};

export const Template5: Story = {
  args: {
    fac: 1,
    template: 5,
    props: mockBulletData,
    bg: '#009966',
    font: '#34495e',
    fontFamily: 'Verdana, sans-serif',
  },
};

// Interactive Controls Story
export const Interactive: Story = {
  args: {
    fac: 1.5,
    template: 3,
    props: mockBulletData,
    bg: '#3498db',
    font: '#2c3e50',
    fontFamily: 'Inter, sans-serif',
  },
};

// Template Comparison Showcase
export const TemplateShowcase: Story = {
  render: () => {
    const templates: Array<{ template: 1 | 2 | 3 | 4 | 5; bg: string; name: string }> = [
      { template: 1, bg: '#e74c3c', name: 'Template 1 - Basic bullet' },
      { template: 2, bg: '#3498db', name: 'Template 2 - Line with conditional' },
      { template: 3, bg: '#2ecc71', name: 'Template 3 - Thin line + secondary' },
      { template: 4, bg: '#f39c12', name: 'Template 4 - Always visible line' },
      { template: 5, bg: '#9b59b6', name: 'Template 5 - Compact layout' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', padding: '20px' }}>
        {templates.map(({ template, bg, name }) => (
          <div key={template} style={{ position: 'relative', height: '50px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>{name}</h4>
            <RightBlockBulletSmall
              fac={1.2}
              template={template}
              props={{
                height: 25,
                top: 0,
                name: `Template ${template} demonstration content`,
                line: true,
              }}
              bg={bg}
              font="#333"
              fontFamily="Inter, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  },
};

// Responsive Scaling Story
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.8, 1.0, 1.5, 2.0];
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: '20px' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ position: 'relative', width: '200px', height: '60px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>Scale: {scale}x</h4>
            <RightBlockBulletSmall
              fac={scale}
              template={3}
              props={mockBulletData}
              bg="#3498db"
              font="#2c3e50"
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  },
};

// Accessibility Testing Story
export const AccessibilityTesting: Story = {
  render: () => {
    const variations = [
      { name: 'High Contrast', bg: '#000000', font: '#ffffff' },
      { name: 'Large Text', bg: '#2c3e50', font: '#ecf0f1', fac: 2.0 },
      { name: 'Color Blind Safe', bg: '#34495e', font: '#e67e22' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '20px' }}>
        {variations.map(({ name, bg, font, fac = 1.5 }) => (
          <div key={name} style={{ position: 'relative', height: '50px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>{name}</h4>
            <RightBlockBulletSmall
              fac={fac}
              template={3}
              props={mockBulletData}
              bg={bg}
              font={font}
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  },
};

// Edge Cases Story
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        name: 'Minimal Size',
        props: { height: 5, top: 0, name: 'Tiny', line: false },
        fac: 0.5,
      },
      {
        name: 'Maximum Size',
        props: { height: 100, top: 20, name: 'Large bullet point', line: true },
        fac: 2.5,
      },
      {
        name: 'Long Content',
        props: mockBulletDataLong,
        fac: 1.0,
      },
      {
        name: 'No Line (Template 2)',
        props: { height: 20, top: 10, name: 'No line shown', line: false },
        fac: 1.0,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '100px', padding: '20px' }}>
        {edgeCases.map(({ name, props, fac }) => (
          <div key={name} style={{ position: 'relative', minHeight: '80px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>{name}</h4>
            <RightBlockBulletSmall
              fac={fac}
              template={2}
              props={props}
              bg="#e74c3c"
              font="#2c3e50"
              fontFamily="Inter, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  },
};

// Props Validation Story
export const PropsValidation: Story = {
  render: () => {
    const validationCases = [
      {
        name: 'Default Values',
        props: { template: undefined, fontFamily: undefined, id: undefined, className: undefined },
      },
      {
        name: 'With All Props',
        props: { 
          template: 4 as const, 
          fontFamily: 'Roboto, sans-serif', 
          id: 'test-bullet', 
          className: 'custom-bullet-class' 
        },
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', padding: '20px' }}>
        {validationCases.map(({ name, props: additionalProps }) => (
          <div key={name} style={{ position: 'relative', height: '50px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>{name}</h4>
            <RightBlockBulletSmall
              fac={1.0}
              props={mockBulletData}
              bg="#95a5a6"
              font="#2c3e50"
              {...additionalProps}
            />
          </div>
        ))}
      </div>
    );
  },
};
