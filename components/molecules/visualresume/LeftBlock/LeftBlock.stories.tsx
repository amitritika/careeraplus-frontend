import type { Meta, StoryObj } from '@storybook/react';
import LeftBlock from './LeftBlock';
import type { LeftBlockProps } from './LeftBlock';

const meta: Meta<typeof LeftBlock> = {
  title: 'Components/LeftBlock',
  component: LeftBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible block component supporting simple blocks and complex multi-bar layouts with page break logic.'
      }
    }
  },
  // CRITICAL: Only use top-level component props in argTypes
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions'
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variant (3 uses multi-bar rendering)'
    },
    height: {
      control: { type: 'range', min: 20, max: 1000, step: 10 },
      description: 'Base height in pixels'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color or CSS background value'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color (maintained for compatibility)'
    },
    id: {
      control: { type: 'text' },
      description: 'HTML element ID'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof LeftBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// Individual Template Stories with Fixed Args
export const Template1: Story = {
  name: 'Template 1 - Simple Block',
  args: {
    fac: 1,
    template: 1,
    height: 200,
    bg: '#3b82f6',
    id: 'leftblock-template1'
  }
};

export const Template2: Story = {
  name: 'Template 2 - Simple Block',
  args: {
    fac: 1,
    template: 2,
    height: 200,
    bg: '#ef4444',
    id: 'leftblock-template2'
  }
};

export const Template3: Story = {
  name: 'Template 3 - Multi-Bar with Page Breaks',
  args: {
    fac: 1,
    template: 3,
    height: 650, // Height that triggers multiple bars
    bg: '#10b981',
    id: 'leftblock-template3'
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 3 features complex multi-bar rendering with automatic page break logic at 297px intervals.'
      }
    }
  }
};

export const Template4: Story = {
  name: 'Template 4 - Simple Block',
  args: {
    fac: 1,
    template: 4,
    height: 200,
    bg: '#f59e0b',
    id: 'leftblock-template4'
  }
};

export const Template5: Story = {
  name: 'Template 5 - Simple Block',
  args: {
    fac: 1,
    template: 5,
    height: 200,
    bg: '#8b5cf6',
    id: 'leftblock-template5'
  }
};

// Interactive Controls Story
export const InteractiveControls: Story = {
  name: 'Interactive Controls',
  args: {
    fac: 1,
    template: 1,
    height: 300,
    bg: '#3b82f6',
    font: '#000000',
    id: 'leftblock-interactive',
    className: 'custom-leftblock'
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls below to experiment with different prop combinations.'
      }
    }
  }
};

// Template Showcase with Side-by-Side Comparison
export const TemplateShowcase: Story = {
  name: 'All Templates Comparison',
  render: () => {
    const commonProps = {
      fac: 1,
      height: 400,
      bg: '#3b82f6'
    };

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <h4>Template 1</h4>
          <div style={{ position: 'relative', width: '100px', height: '420px', border: '1px solid #ccc' }}>
            <LeftBlock {...commonProps} template={1} id="showcase-1" />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h4>Template 2</h4>
          <div style={{ position: 'relative', width: '100px', height: '420px', border: '1px solid #ccc' }}>
            <LeftBlock {...commonProps} template={2} id="showcase-2" />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h4>Template 3 (Multi-Bar)</h4>
          <div style={{ position: 'relative', width: '100px', height: '420px', border: '1px solid #ccc' }}>
            <LeftBlock {...commonProps} template={3} height={600} id="showcase-3" />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h4>Template 4</h4>
          <div style={{ position: 'relative', width: '100px', height: '420px', border: '1px solid #ccc' }}>
            <LeftBlock {...commonProps} template={4} id="showcase-4" />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h4>Template 5</h4>
          <div style={{ position: 'relative', width: '100px', height: '420px', border: '1px solid #ccc' }}>
            <LeftBlock {...commonProps} template={5} id="showcase-5" />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all template variations showing their unique characteristics.'
      }
    }
  }
};

// Responsive Scaling Story
export const ResponsiveScaling: Story = {
  name: 'Responsive Scaling Factors',
  render: () => {
    const scales = [0.5, 1, 1.5, 2];
    const baseProps = {
      template: 3 as const,
      height: 400,
      bg: '#10b981'
    };

    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ textAlign: 'center' }}>
            <h4>Scale {scale}x</h4>
            <div style={{ 
              position: 'relative', 
              width: `${80 * scale + 20}px`, 
              height: `${400 * scale + 20}px`, 
              border: '1px solid #ccc' 
            }}>
              <LeftBlock 
                {...baseProps} 
                fac={scale} 
                id={`scale-${scale}`} 
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the fac prop scales all dimensions proportionally.'
      }
    }
  }
};

// Accessibility Testing Story
export const AccessibilityTesting: Story = {
  name: 'Accessibility & High Contrast',
  render: () => {
    const accessibilityVariations: LeftBlockProps[] = [
      {
        fac: 1,
        template: 1,
        height: 200,
        bg: '#000000',
        id: 'high-contrast-1'
      },
      {
        fac: 1.2,
        template: 2,
        height: 200,
        bg: '#ffffff',
        id: 'high-contrast-2',
        className: 'high-contrast-border'
      },
      {
        fac: 1,
        template: 3,
        height: 400,
        bg: '#ff0000',
        id: 'high-contrast-3'
      }
    ];

    return (
      <div>
        <style dangerouslySetInnerHTML={{
          __html: `
            .high-contrast-border {
              border: 2px solid #000000 !important;
            }
          `
        }} />
        <div style={{ display: 'flex', gap: '20px' }}>
          {accessibilityVariations.map((props, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <h4>High Contrast {index + 1}</h4>
              <div style={{ 
                position: 'relative', 
                width: '120px', 
                height: '220px', 
                backgroundColor: index === 1 ? '#000' : '#fff',
                border: '1px solid #ccc' 
              }}>
                <LeftBlock {...props} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

// Edge Cases Story
export const EdgeCases: Story = {
  name: 'Edge Cases & Extreme Values',
  render: () => {
    const edgeCases: Array<{ title: string; props: LeftBlockProps }> = [
      {
        title: 'Minimum Height',
        props: { fac: 1, template: 1, height: 1, bg: '#3b82f6', id: 'edge-min-height' }
      },
      {
        title: 'Maximum Scale',
        props: { fac: 3, template: 2, height: 100, bg: '#ef4444', id: 'edge-max-scale' }
      },
      {
        title: 'Template 3 Small Height',
        props: { fac: 1, template: 3, height: 50, bg: '#10b981', id: 'edge-template3-small' }
      },
      {
        title: 'Gradient Background',
        props: { 
          fac: 1, 
          template: 4, 
          height: 200, 
          bg: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
          id: 'edge-gradient' 
        }
      }
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {edgeCases.map(({ title, props }) => (
          <div key={props.id} style={{ textAlign: 'center' }}>
            <h4>{title}</h4>
            <div style={{ 
              position: 'relative', 
              width: '120px', 
              height: '220px', 
              border: '1px solid #ccc',
              margin: '0 auto'
            }}>
              <LeftBlock {...props} />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

// Props Validation Story
export const PropsValidation: Story = {
  name: 'Props Validation & Defaults',
  render: () => {
    const validationCases: Array<{ title: string; props: Partial<LeftBlockProps> }> = [
      {
        title: 'Default Template',
        props: { fac: 1, height: 200, bg: '#3b82f6' }
      },
      {
        title: 'Without Optional Props',
        props: { fac: 1, height: 200, bg: '#ef4444', template: 2 }
      },
      {
        title: 'With All Props',
        props: { 
          fac: 1, 
          height: 200, 
          bg: '#10b981', 
          font: '#ffffff',
          id: 'full-props',
          template: 3,
          className: 'test-class'
        }
      }
    ];

    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        {validationCases.map(({ title, props }) => (
          <div key={title} style={{ textAlign: 'center' }}>
            <h4>{title}</h4>
            <div style={{ 
              position: 'relative', 
              width: '100px', 
              height: '220px', 
              border: '1px solid #ccc'
            }}>
              <LeftBlock {...(props as LeftBlockProps)} />
            </div>
          </div>
        ))}
      </div>
    );
  }
};
