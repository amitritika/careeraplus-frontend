import type { Meta, StoryObj } from '@storybook/react';
import RightBlockHeading, { TemplateType } from './RightBlockHeading';

const meta: Meta<typeof RightBlockHeading> = {
  title: 'Components/RightBlockHeading',
  component: RightBlockHeading,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive heading component supporting 5 template variations with configurable styling and optional line decorations.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for responsive sizing'
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variation (1-5)'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background/theme color'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color (used in template 3)'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family'
    },
    id: {
      control: { type: 'text' },
      description: 'Element ID'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RightBlockHeading>;

// Mock text width function for templates 2 & 3
const mockTextWidthFn = (fontFamily: string, fontWeight: string, fontSize: string, width: string, text: string): number[] => {
  const estimatedWidth = Math.min(text.length * 4, 80); // Rough estimation
  return [0, estimatedWidth];
};

// Sample data
const sampleProps = {
  height: 20,
  top: 10,
  name: 'EXPERIENCE'
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const templates: TemplateType[] = [1, 2, 3, 4, 5];
    return (
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '40px', 
        padding: '20px',
        backgroundColor: '#f5f5f5' 
      }}>
        {templates.map((template) => (
          <div key={template} style={{ 
            position: 'relative', 
            minHeight: '100px', 
            minWidth: '200px',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '20px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
              Template {template}
            </h4>
            <RightBlockHeading
              fac={1.2}
              template={template}
              props={sampleProps}
              bg="#2563eb"
              font="#dc2626"
              textWidthFn={mockTextWidthFn}
              id={`template-${template}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Interactive controls story
export const InteractiveControls: Story = {
  args: {
    fac: 1.2,
    template: 1,
    props: sampleProps,
    bg: '#2563eb',
    font: '#dc2626',
    fontFamily: 'Calibri',
    id: 'heading-1',
    className: ''
  },
  render: (args) => (
    <div style={{ 
      position: 'relative', 
      height: '200px', 
      backgroundColor: '#f9fafb',
      padding: '20px',
      border: '1px solid #e5e7eb'
    }}>
      <RightBlockHeading
        {...args}
        textWidthFn={mockTextWidthFn}
      />
    </div>
  )
};

// Individual template stories
export const Template1: Story = {
  args: {
    fac: 1.2,
    template: 1,
    props: sampleProps,
    bg: '#1f2937',
    id: 'template1'
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '150px', padding: '20px', backgroundColor: '#f3f4f6' }}>
      <RightBlockHeading {...args} />
    </div>
  )
};

export const Template2: Story = {
  args: {
    fac: 1.2,
    template: 2,
    props: sampleProps,
    bg: '#059669',
    id: 'template2'
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '150px', padding: '20px', backgroundColor: '#f3f4f6' }}>
      <RightBlockHeading {...args} textWidthFn={mockTextWidthFn} />
    </div>
  )
};

export const Template3: Story = {
  args: {
    fac: 1.2,
    template: 3,
    props: sampleProps,
    bg: '#6366f1',
    font: '#dc2626',
    id: 'template3'
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '150px', padding: '20px', backgroundColor: '#f3f4f6' }}>
      <RightBlockHeading {...args} textWidthFn={mockTextWidthFn} />
    </div>
  )
};

export const Template4: Story = {
  args: {
    fac: 1.2,
    template: 4,
    props: sampleProps,
    bg: '#ea580c',
    id: 'template4'
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '150px', padding: '20px', backgroundColor: '#f3f4f6' }}>
      <RightBlockHeading {...args} />
    </div>
  )
};

export const Template5: Story = {
  args: {
    fac: 1.2,
    template: 5,
    props: sampleProps,
    bg: '#7c3aed',
    id: 'template5'
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '150px', padding: '20px', backgroundColor: '#f3f4f6' }}>
      <RightBlockHeading {...args} />
    </div>
  )
};

// Responsive scaling story
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.8, 1.0, 1.2, 1.5, 2.0];
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        padding: '20px' 
      }}>
        {scales.map((scale) => (
          <div key={scale} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px' 
          }}>
            <span style={{ 
              minWidth: '80px', 
              fontSize: '14px', 
              color: '#666' 
            }}>
              Scale: {scale}x
            </span>
            <div style={{ 
              position: 'relative', 
              height: `${60 * scale}px`, 
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              minWidth: '300px'
            }}>
              <RightBlockHeading
                fac={scale}
                template={1}
                props={sampleProps}
                bg="#1f2937"
                id={`scale-${scale}`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

// Accessibility testing
export const AccessibilityTesting: Story = {
  render: () => {
    const variants = [
      { name: 'High Contrast', bg: '#000000', font: '#ffffff' },
      { name: 'Large Text', bg: '#1f2937', font: '#ffffff', fac: 2.0 },
      { name: 'Color Blind Safe', bg: '#0066cc', font: '#ffffff' }
    ];
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '30px', 
        padding: '20px' 
      }}>
        {variants.map((variant) => (
          <div key={variant.name}>
            <h4 style={{ margin: '0 0 15px 0' }}>{variant.name}</h4>
            <div style={{ 
              position: 'relative', 
              height: '120px', 
              backgroundColor: variant.name === 'High Contrast' ? '#ffffff' : '#f3f4f6',
              border: '1px solid #e5e7eb',
              padding: '20px'
            }}>
              <RightBlockHeading
                fac={variant.fac || 1.2}
                template={3}
                props={sampleProps}
                bg={variant.bg}
                font={variant.font}
                textWidthFn={mockTextWidthFn}
                id={`a11y-${variant.name.toLowerCase().replace(' ', '-')}`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

// Edge cases story
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      { name: 'Very Long Text', props: { height: 20, top: 10, name: 'PROFESSIONAL WORK EXPERIENCE & ACHIEVEMENTS' }},
      { name: 'Short Text', props: { height: 20, top: 10, name: 'JOBS' }},
      { name: 'Extreme Scale', fac: 0.5, props: sampleProps },
      { name: 'Large Scale', fac: 3.0, props: sampleProps }
    ];
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px', 
        padding: '20px' 
      }}>
        {edgeCases.map((testCase) => (
          <div key={testCase.name} style={{ 
            position: 'relative', 
            minHeight: '100px', 
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            padding: '20px'
          }}>
            <h5 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
              {testCase.name}
            </h5>
            <RightBlockHeading
              fac={testCase.fac || 1.2}
              template={2}
              props={testCase.props}
              bg="#2563eb"
              textWidthFn={mockTextWidthFn}
              id={`edge-${testCase.name.toLowerCase().replace(' ', '-')}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Props validation story
export const PropsValidation: Story = {
  render: () => {
    const validationTests = [
      { name: 'Minimal Props', props: { fac: 1, template: 1 as TemplateType, props: sampleProps, bg: '#000' }},
      { name: 'All Props', props: { 
        fac: 1.2, 
        template: 2 as TemplateType, 
        props: sampleProps, 
        bg: '#2563eb', 
        font: '#dc2626',
        fontFamily: 'Arial',
        id: 'full-props',
        className: 'custom-heading'
      }},
      { name: 'Missing Optional Props', props: { fac: 1, template: 3 as TemplateType, props: sampleProps, bg: '#059669' }}
    ];
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '30px', 
        padding: '20px' 
      }}>
        {validationTests.map((test) => (
          <div key={test.name}>
            <h4 style={{ margin: '0 0 10px 0' }}>{test.name}</h4>
            <div style={{ 
              position: 'relative', 
              height: '80px', 
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              padding: '20px'
            }}>
              <RightBlockHeading
                {...test.props}
                textWidthFn={mockTextWidthFn}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
};
