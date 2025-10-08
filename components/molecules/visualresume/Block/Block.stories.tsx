import type { Meta, StoryObj } from '@storybook/react';
import Block from './Block';

const meta: Meta<typeof Block> = {
  title: 'Components/Block',
  component: Block,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Consolidated Block component supporting 5 template variations with scalable dimensions and positioning.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: 'Scale factor for all dimensions'
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variation to render'
    },
    height: {
      control: { type: 'range', min: 10, max: 500, step: 5 },
      description: 'Height in base units'
    },
    top: {
      control: { type: 'range', min: 0, max: 200, step: 5 },
      description: 'Top position offset'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color (Template 3 only)'
    },
    font: {
      control: { type: 'color' },
      description: 'Font/text color (Template 3 only)'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family override'
    },
    id: {
      control: { type: 'text' },
      description: 'Unique identifier'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Block>;

// Interactive controls story
export const Interactive: Story = {
  args: {
    fac: 1,
    template: 1,
    height: 100,
    top: 20,
    bg: '#3b82f6',
    font: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    id: 'interactive-block'
  }
};

// Individual template stories with fixed configurations
export const Template1: Story = {
  args: {
    fac: 1,
    template: 1,
    height: 80,
    top: 10,
    id: 'template-1'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic block template with standard dimensions'
      }
    }
  }
};

export const Template2: Story = {
  args: {
    fac: 1,
    template: 2,
    height: 80,
    top: 10,
    id: 'template-2'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic block template identical to Template 1'
      }
    }
  }
};

export const Template3Complex: Story = {
  args: {
    fac: 1,
    template: 3,
    height: 600,
    top: 10,
    bg: '#ef4444',
    font: '#ffffff',
    id: 'template-3'
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex template with multi-bar rendering and page break logic'
      }
    }
  }
};

export const Template4: Story = {
  args: {
    fac: 1,
    template: 4,
    height: 80,
    top: 10,
    id: 'template-4'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic block template identical to Templates 1 and 2'
      }
    }
  }
};

export const Template5: Story = {
  args: {
    fac: 1,
    template: 5,
    height: 80,
    top: 10,
    id: 'template-5'
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic block template identical to Templates 1, 2, and 4'
      }
    }
  }
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const commonProps = { fac: 0.8, height: 100, top: 20 };
    
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
        <div>
          <h4>Template 1</h4>
          <Block {...commonProps} template={1} id="showcase-1" />
        </div>
        <div>
          <h4>Template 2</h4>
          <Block {...commonProps} template={2} id="showcase-2" />
        </div>
        <div>
          <h4>Template 3 (Complex)</h4>
          <Block 
            {...commonProps} 
            template={3} 
            height={400}
            bg="#10b981" 
            font="#ffffff" 
            id="showcase-3" 
          />
        </div>
        <div>
          <h4>Template 4</h4>
          <Block {...commonProps} template={4} id="showcase-4" />
        </div>
        <div>
          <h4>Template 5</h4>
          <Block {...commonProps} template={5} id="showcase-5" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all template variations'
      }
    }
  }
};

// Responsive scaling demonstration
export const ResponsiveScaling: Story = {
  render: () => {
    const baseProps = { template: 3, height: 300, top: 10, bg: '#8b5cf6', font: '#ffffff' };
    const scales = [0.5, 1, 1.5, 2];
    
    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '20px' }}>
        {scales.map(scale => (
          <div key={scale}>
            <h4>Scale: {scale}x</h4>
            <Block {...baseProps} fac={scale} id={`scale-${scale}`} />
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
export const AccessibilityTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h4>High Contrast Template 3</h4>
        <Block
          fac={1.2}
          template={3}
          height={200}
          top={10}
          bg="#000000"
          font="#ffffff"
          fontFamily="Arial, sans-serif"
          id="high-contrast"
        />
      </div>
      <div>
        <h4>Large Scale Basic Template</h4>
        <Block
          fac={2}
          template={1}
          height={60}
          top={10}
          className="accessibility-block"
          id="large-scale"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility testing with high contrast and large text variations'
      }
    }
  }
};

// Edge cases testing
export const EdgeCases: Story = {
  render: () => (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div>
        <h4>Minimal Height</h4>
        <Block fac={1} template={3} height={15} top={5} bg="#dc2626" font="#ffffff" id="min-height" />
      </div>
      <div>
        <h4>Maximum Scale</h4>
        <Block fac={3} template={1} height={20} top={5} id="max-scale" />
      </div>
      <div>
        <h4>Large Height (Multiple Bars)</h4>
        <Block fac={0.5} template={3} height={900} top={5} bg="#059669" font="#ffffff" id="large-height" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases with extreme values and content lengths'
      }
    }
  }
};

// Props validation with defaults
export const PropsValidation: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h4>Default Props</h4>
        <Block fac={1} height={80} top={10} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h4>Missing Optional Props</h4>
        <Block fac={1} template={3} height={150} top={10} />
      </div>
      <div>
        <h4>All Props Defined</h4>
        <Block
          fac={1}
          template={3}
          height={200}
          top={15}
          bg="#6366f1"
          font="#ffffff"
          fontFamily="Georgia, serif"
          className="fully-configured"
          id="all-props"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Validation of default values and missing optional props'
      }
    }
  }
};
