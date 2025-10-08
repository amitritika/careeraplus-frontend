import type { Meta, StoryObj } from '@storybook/react';
import BlockVL, { BlockVLComponentProps } from './BlockVL';

const meta: Meta<typeof BlockVL> = {
  title: 'Components/BlockVL',
  component: BlockVL,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A vertical line component with absolute positioning, commonly used in resume templates and document layouts for visual separation.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color for the vertical line'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color (maintained for compatibility)'
    },
    id: {
      control: { type: 'text' },
      description: 'HTML ID attribute'
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name'
    },
    template: {
      control: { type: 'select', options: [1, 2, 3, 4, 5] },
      description: 'Template variant (all identical)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof BlockVL>;

// Default story with interactive controls (top-level props only)
export const Interactive: Story = {
  args: {
    fac: 1,
    bg: '#333333',
    font: '#000000',
    id: 'block-vl-interactive',
    className: '',
    template: 1,
    props: {
      height: 50,
      top: 10
    }
  }
};

// Individual template stories
export const Template1: Story = {
  args: {
    fac: 1,
    bg: '#2563eb',
    props: { height: 60, top: 0 },
    id: 'template-1'
  }
};

export const Template2: Story = {
  args: {
    fac: 1.2,
    bg: '#dc2626',
    props: { height: 80, top: 15 },
    id: 'template-2'
  }
};

export const Template3: Story = {
  args: {
    fac: 0.8,
    bg: '#16a34a',
    props: { height: 40, top: 5 },
    id: 'template-3'
  }
};

export const Template4: Story = {
  args: {
    fac: 1.5,
    bg: '#ca8a04',
    props: { height: 100, top: 25 },
    id: 'template-4'
  }
};

export const Template5: Story = {
  args: {
    fac: 1,
    bg: '#7c3aed',
    props: { height: 70, top: 20 },
    id: 'template-5'
  }
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const templates = [
      { fac: 1, bg: '#2563eb', props: { height: 50, top: 0 }, label: 'Template 1' },
      { fac: 1, bg: '#dc2626', props: { height: 60, top: 0 }, label: 'Template 2' },
      { fac: 1, bg: '#16a34a', props: { height: 70, top: 0 }, label: 'Template 3' },
      { fac: 1, bg: '#ca8a04', props: { height: 80, top: 0 }, label: 'Template 4' },
      { fac: 1, bg: '#7c3aed', props: { height: 90, top: 0 }, label: 'Template 5' }
    ];

    return (
      <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', padding: '20px' }}>
        {templates.map((template, index) => (
          <div key={index} style={{ position: 'relative', width: '50px', height: '100px' }}>
            <div style={{ 
              position: 'absolute', 
              bottom: '-25px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              fontSize: '12px', 
              color: '#666',
              whiteSpace: 'nowrap'
            }}>
              {template.label}
            </div>
            <BlockVL
              {...template}
              id={`showcase-${index + 1}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all template variations showing identical structure with different colors and heights.'
      }
    }
  }
};

// Responsive scaling demonstration
export const ResponsiveScaling: Story = {
  render: () => {
    const scalingFactors = [0.5, 1, 1.5, 2];
    const baseProps = { height: 60, top: 10 };

    return (
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', padding: '20px' }}>
        {scalingFactors.map((fac, index) => (
          <div key={index} style={{ position: 'relative', width: '50px', height: '140px' }}>
            <div style={{ 
              position: 'absolute', 
              bottom: '-25px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              fontSize: '12px', 
              color: '#666'
            }}>
              {fac}x
            </div>
            <BlockVL
              fac={fac}
              bg="#4f46e5"
              props={baseProps}
              id={`scaling-${fac}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the scaling factor (fac) affects the component dimensions and positioning.'
      }
    }
  }
};

// Accessibility and high contrast variations
export const AccessibilityVariations: Story = {
  render: () => {
    const variations = [
      { bg: '#000000', label: 'High Contrast Black', props: { height: 60, top: 10 } },
      { bg: '#ffffff', label: 'High Contrast White', props: { height: 60, top: 10 } },
      { bg: '#0066cc', label: 'WCAG AA Blue', props: { height: 80, top: 10 } },
      { bg: '#d73027', label: 'WCAG AA Red', props: { height: 100, top: 10 } }
    ];

    return (
      <div style={{ 
        display: 'flex', 
        gap: '60px', 
        alignItems: 'flex-start', 
        padding: '20px',
        backgroundColor: '#f5f5f5'
      }}>
        {variations.map((variation, index) => (
          <div key={index} style={{ position: 'relative', width: '50px', height: '140px' }}>
            <div style={{ 
              position: 'absolute', 
              bottom: '-45px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              fontSize: '11px', 
              color: '#666',
              textAlign: 'center',
              width: '80px'
            }}>
              {variation.label}
            </div>
            <BlockVL
              fac={1}
              bg={variation.bg}
              props={variation.props}
              id={`accessibility-${index + 1}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility-focused variations with high contrast colors and WCAG compliant color schemes.'
      }
    }
  }
};

// Edge cases and extreme values
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      { fac: 0.1, props: { height: 10, top: 0 }, label: 'Minimum Scale', bg: '#ef4444' },
      { fac: 3, props: { height: 30, top: 5 }, label: 'Maximum Scale', bg: '#22c55e' },
      { fac: 1, props: { height: 200, top: 0 }, label: 'Very Tall', bg: '#3b82f6' },
      { fac: 1, props: { height: 2, top: 50 }, label: 'Very Short', bg: '#f59e0b' }
    ];

    return (
      <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', padding: '20px' }}>
        {edgeCases.map((testCase, index) => (
          <div key={index} style={{ position: 'relative', width: '60px', height: '220px' }}>
            <div style={{ 
              position: 'absolute', 
              bottom: '-35px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              fontSize: '11px', 
              color: '#666',
              textAlign: 'center',
              width: '80px'
            }}>
              {testCase.label}
            </div>
            <BlockVL
              fac={testCase.fac}
              bg={testCase.bg}
              props={testCase.props}
              id={`edge-case-${index + 1}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests extreme values and edge cases to validate component robustness and proper rendering.'
      }
    }
  }
};

// Props validation with defaults
export const PropsValidation: Story = {
  render: () => {
    const validationCases = [
      { 
        props: { fac: 1, bg: '#333333', props: { height: 50, top: 10 } },
        label: 'All Props Provided'
      },
      { 
        props: { fac: 1, bg: '#666666', props: { height: 40, top: 5 }, id: 'with-id' },
        label: 'With Optional ID'
      },
      { 
        props: { fac: 1.2, bg: '#999999', props: { height: 60, top: 15 }, className: 'custom-class' },
        label: 'With CSS Class'
      },
      { 
        props: { fac: 0.8, bg: '#bbbbbb', props: { height: 30, top: 8 }, font: '#ff0000', template: 3 },
        label: 'All Optional Props'
      }
    ];

    return (
      <div style={{ display: 'flex', gap: '70px', alignItems: 'flex-start', padding: '20px' }}>
        {validationCases.map((testCase, index) => (
          <div key={index} style={{ position: 'relative', width: '60px', height: '80px' }}>
            <div style={{ 
              position: 'absolute', 
              bottom: '-45px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              fontSize: '10px', 
              color: '#666',
              textAlign: 'center',
              width: '90px'
            }}>
              {testCase.label}
            </div>
            <BlockVL
              {...testCase.props}
              key={`validation-${index}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Validates component behavior with various combinations of required and optional props.'
      }
    }
  }
};
