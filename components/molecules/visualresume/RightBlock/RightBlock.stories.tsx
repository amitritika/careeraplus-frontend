import type { Meta, StoryObj } from '@storybook/react';
import RightBlock from './RightBlock';

const meta: Meta<typeof RightBlock> = {
  title: 'Components/RightBlock',
  component: RightBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
RightBlock is a versatile component that renders centered blocks or multiple bars based on template variants.

**Templates:**
- Templates 1, 2, 4, 5: Single centered block
- Template 3: Multiple bars with height-based segmentation

**Key Features:**
- Responsive scaling with fac parameter
- Template-based rendering variations
- Optimized performance with memoized calculations
- TypeScript-safe implementation
        `
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions'
    },
    height: {
      control: { type: 'range', min: 10, max: 1000, step: 10 },
      description: 'Component height in pixels'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color (compatibility prop)'
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variant'
    },
    id: {
      control: { type: 'text' },
      description: 'Element ID'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default interactive story
export const Interactive: Story = {
  args: {
    fac: 1,
    height: 200,
    bg: '#3b82f6',
    font: '#000000',
    id: 'right-block-interactive',
    template: 1,
    className: '',
    fontFamily: 'Arial, sans-serif'
  }
};

// Individual template stories
export const Template1: Story = {
  args: {
    fac: 1,
    height: 150,
    bg: '#ef4444',
    font: '#000000',
    id: 'right-block-template1',
    template: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 1: Single centered block with standard positioning'
      }
    }
  }
};

export const Template2: Story = {
  args: {
    fac: 1,
    height: 150,
    bg: '#10b981',
    font: '#000000',
    id: 'right-block-template2',
    template: 2
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 2: Single centered block identical to Template 1'
      }
    }
  }
};

export const Template3: Story = {
  args: {
    fac: 1,
    height: 600,
    bg: '#f59e0b',
    font: '#000000',
    id: 'right-block-template3',
    template: 3
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 3: Multiple bars generated based on height segments (297px each)'
      }
    }
  }
};

export const Template4: Story = {
  args: {
    fac: 1,
    height: 150,
    bg: '#8b5cf6',
    font: '#000000',
    id: 'right-block-template4',
    template: 4
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 4: Single centered block identical to Template 1'
      }
    }
  }
};

export const Template5: Story = {
  args: {
    fac: 1,
    height: 150,
    bg: '#ec4899',
    font: '#000000',
    id: 'right-block-template5',
    template: 5
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 5: Single centered block identical to Template 1'
      }
    }
  }
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const templates = [
      { template: 1, bg: '#ef4444', label: 'Template 1' },
      { template: 2, bg: '#10b981', label: 'Template 2' },
      { template: 3, bg: '#f59e0b', label: 'Template 3' },
      { template: 4, bg: '#8b5cf6', label: 'Template 4' },
      { template: 5, bg: '#ec4899', label: 'Template 5' }
    ];

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {templates.map(({ template, bg, label }) => (
          <div key={template} style={{ textAlign: 'center', position: 'relative', height: '300px', width: '200px' }}>
            <h4>{label}</h4>
            <RightBlock
              fac={1}
              height={template === 3 ? 400 : 150}
              bg={bg}
              font="#000000"
              id={`showcase-template${template}`}
              template={template as 1 | 2 | 3 | 4 | 5}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all template variants'
      }
    }
  }
};

// Responsive scaling demo
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.5, 1, 1.5, 2];
    
    return (
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        {scales.map((fac) => (
          <div key={fac} style={{ textAlign: 'center', position: 'relative', height: '250px', width: '150px' }}>
            <h4>Scale: {fac}x</h4>
            <RightBlock
              fac={fac}
              height={100}
              bg="#3b82f6"
              font="#000000"
              id={`scale-${fac}`}
              template={1}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates responsive scaling with different fac values'
      }
    }
  }
};

// Accessibility and high contrast
export const AccessibilityDemo: Story = {
  render: () => {
    const variants = [
      { bg: '#000000', font: '#ffffff', label: 'High Contrast' },
      { bg: '#ffffff', font: '#000000', label: 'Light Mode' },
      { bg: '#1f2937', font: '#f9fafb', label: 'Dark Mode' }
    ];

    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        {variants.map(({ bg, font, label }) => (
          <div key={label} style={{ textAlign: 'center', position: 'relative', height: '200px', width: '200px' }}>
            <h4>{label}</h4>
            <RightBlock
              fac={1}
              height={120}
              bg={bg}
              font={font}
              id={`accessibility-${label.toLowerCase().replace(' ', '-')}`}
              template={1}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility testing with high contrast and different color schemes'
      }
    }
  }
};

// Edge cases and extreme values
export const EdgeCases: Story = {
  render: () => {
    const cases = [
      { height: 10, fac: 0.5, bg: '#ef4444', label: 'Minimum Height' },
      { height: 1000, fac: 0.3, bg: '#10b981', label: 'Large Height' },
      { height: 297, fac: 1, bg: '#f59e0b', label: 'Segment Boundary', template: 3 },
      { height: 600, fac: 2, bg: '#8b5cf6', label: 'Multi-segment', template: 3 }
    ];

    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {cases.map(({ height, fac, bg, label, template = 1 }) => (
          <div key={label} style={{ textAlign: 'center', position: 'relative', height: '300px', width: '150px' }}>
            <h4>{label}</h4>
            <p style={{ fontSize: '12px' }}>H:{height}, F:{fac}</p>
            <RightBlock
              fac={fac}
              height={height}
              bg={bg}
              font="#000000"
              id={`edge-${label.toLowerCase().replace(' ', '-')}`}
              template={template as 1 | 2 | 3 | 4 | 5}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge cases with extreme values and boundary conditions'
      }
    }
  }
};

// Props validation and defaults
export const PropsValidation: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ textAlign: 'center', position: 'relative', height: '200px', width: '200px' }}>
          <h4>With All Props</h4>
          <RightBlock
            fac={1}
            height={150}
            bg="#3b82f6"
            font="#000000"
            id="full-props"
            template={1}
            className="custom-class"
            fontFamily="Georgia"
          />
        </div>
        <div style={{ textAlign: 'center', position: 'relative', height: '200px', width: '200px' }}>
          <h4>Minimal Props</h4>
          <RightBlock
            fac={1}
            height={150}
            bg="#10b981"
            font="#000000"
            id="minimal-props"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Validates component behavior with full props vs minimal required props'
      }
    }
  }
};
