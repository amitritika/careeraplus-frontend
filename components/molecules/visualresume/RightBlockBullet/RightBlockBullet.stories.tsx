import type { Meta, StoryObj } from '@storybook/react';
import RightBlockBullet from './RightBlockBullet';

const meta: Meta<typeof RightBlockBullet> = {
  title: 'Components/RightBlockBullet',
  component: RightBlockBullet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A consolidated bullet component supporting 5 template variations with different positioning, icons, and line configurations.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions'
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variant (1-5)'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color for bullet and line'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color for text and icons'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family for text content'
    },
    id: {
      control: { type: 'text' },
      description: 'Component ID'
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for consistent testing
const mockContent = {
  basicText: 'Led cross-functional team of 12 engineers',
  htmlContent: '<strong>Implemented</strong> microservices architecture with <em>95% uptime</em>',
  longContent: 'Developed and maintained complex distributed systems architecture serving over 10 million daily active users with sub-200ms response times'
};

/**
 * Template 1: Basic bullet point
 */
export const Template1: Story = {
  args: {
    fac: 1.2,
    template: 1,
    bg: '#007bff',
    font: '#333333',
    fontFamily: 'Arial, sans-serif',
    id: 'bullet-template1',
    props: {
      height: 40,
      name: mockContent.basicText,
      top: 10
    }
  }
};

/**
 * Template 2: Bullet with vertical line
 */
export const Template2: Story = {
  args: {
    fac: 1.2,
    template: 2,
    bg: '#28a745',
    font: '#333333',
    fontFamily: 'Arial, sans-serif',
    id: 'bullet-template2',
    props: {
      height: 45,
      name: mockContent.htmlContent,
      top: 15,
      line: 0.8
    }
  }
};

/**
 * Template 3: Bullet with line and star icon
 */
export const Template3: Story = {
  args: {
    fac: 1.2,
    template: 3,
    bg: '#dc3545',
    font: '#333333',
    fontFamily: 'Arial, sans-serif',
    id: 'bullet-template3',
    props: {
      height: 50,
      name: mockContent.longContent,
      top: 20,
      line: 0.6
    }
  }
};

/**
 * Template 4: Bullet with star icon (no line)
 */
export const Template4: Story = {
  args: {
    fac: 1.2,
    template: 4,
    bg: '#ffc107',
    font: '#333333',
    fontFamily: 'Arial, sans-serif',
    id: 'bullet-template4',
    props: {
      height: 45,
      name: mockContent.htmlContent,
      top: 15
    }
  }
};

/**
 * Template 5: Bullet with minus icon and offset positioning
 */
export const Template5: Story = {
  args: {
    fac: 1.2,
    template: 5,
    bg: '#6f42c1',
    font: '#333333',
    fontFamily: 'Arial, sans-serif',
    id: 'bullet-template5',
    props: {
      height: 40,
      name: mockContent.basicText,
      top: 10
    }
  }
};

/**
 * Interactive Controls: Allows users to experiment with top-level props
 */
export const InteractiveControls: Story = {
  args: {
    fac: 1.2,
    template: 1,
    bg: '#007bff',
    font: '#333333',
    fontFamily: 'Arial, sans-serif',
    id: 'bullet-interactive',
    props: {
      height: 40,
      name: mockContent.basicText,
      top: 10,
      line: 0.8
    }
  }
};

/**
 * Template Showcase: Side-by-side comparison of all templates
 */
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseProps = {
      fac: 1.0,
      bg: '#007bff',
      font: '#333333',
      fontFamily: 'Arial, sans-serif',
      props: {
        height: 50,
        name: 'Template Comparison',
        top: 0,
        line: 0.7
      }
    };

    return (
      <div style={{ display: 'flex', gap: '150px', padding: '20px', position: 'relative', height: '100px' }}>
        {[1, 2, 3, 4, 5].map(template => (
          <div key={template} style={{ position: 'relative', width: '150px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
              Template {template}
            </h4>
            <RightBlockBullet
              {...showcaseProps}
              template={template}
              id={`showcase-template${template}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all five template variations side by side'
      }
    }
  }
};

/**
 * Responsive Scaling: Different fac values demonstration
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scalingFactors = [0.8, 1.0, 1.2, 1.5, 2.0];
    
    return (
      <div style={{ display: 'flex', gap: '100px', padding: '20px', alignItems: 'flex-start' }}>
        {scalingFactors.map(fac => (
          <div key={fac} style={{ position: 'relative' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
              fac: {fac}
            </h4>
            <RightBlockBullet
              fac={fac}
              template={3}
              bg="#007bff"
              font="#333333"
              fontFamily="Arial, sans-serif"
              id={`scaling-${fac}`}
              props={{
                height: 40,
                name: `Scale ${fac}x`,
                top: 0,
                line: 0.8
              }}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of responsive scaling using different fac values'
      }
    }
  }
};

/**
 * Accessibility Testing: High contrast and large text variations
 */
export const AccessibilityTesting: Story = {
  render: () => {
    const a11yVariations = [
      { name: 'High Contrast', bg: '#000000', font: '#ffffff', fac: 1.2 },
      { name: 'Large Text', bg: '#007bff', font: '#333333', fac: 1.8 },
      { name: 'Color Blind Safe', bg: '#0066cc', font: '#003366', fac: 1.2 }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '20px' }}>
        {a11yVariations.map((variation, index) => (
          <div key={variation.name} style={{ position: 'relative' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
              {variation.name}
            </h4>
            <RightBlockBullet
              fac={variation.fac}
              template={2}
              bg={variation.bg}
              font={variation.font}
              fontFamily="Arial, sans-serif"
              id={`a11y-${index}`}
              props={{
                height: 45,
                name: 'Accessibility focused content',
                top: 0,
                line: 0.8
              }}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility testing with high contrast and large text variations'
      }
    }
  }
};

/**
 * Edge Cases: Extreme values and content lengths
 */
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        name: 'Minimum Values',
        fac: 0.5,
        props: { height: 20, name: 'Min', top: 0, line: 0.1 }
      },
      {
        name: 'Maximum Values',
        fac: 2.5,
        props: { height: 80, name: 'Maximum scale test', top: 50, line: 1.0 }
      },
      {
        name: 'Long Content',
        fac: 1.0,
        props: { 
          height: 60, 
          name: 'This is an extremely long content string that tests how the component handles overflow and text wrapping in various scenarios',
          top: 20,
          line: 0.5
        }
      },
      {
        name: 'HTML Content',
        fac: 1.2,
        props: {
          height: 50,
          name: '<strong>Bold</strong>, <em>italic</em>, and <u>underlined</u> content with <span style="color: red;">colored text</span>',
          top: 15,
          line: 0.7
        }
      }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '120px', padding: '20px' }}>
        {edgeCases.map((testCase, index) => (
          <div key={testCase.name} style={{ position: 'relative' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
              {testCase.name}
            </h4>
            <RightBlockBullet
              fac={testCase.fac}
              template={3}
              bg="#007bff"
              font="#333333"
              fontFamily="Arial, sans-serif"
              id={`edge-${index}`}
              props={testCase.props}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case testing with extreme values, long content, and complex HTML'
      }
    }
  }
};

/**
 * Props Validation: Testing with default values and missing optionals
 */
export const PropsValidation: Story = {
  render: () => {
    const validationTests = [
      {
        name: 'All Props Present',
        component: (
          <RightBlockBullet
            fac={1.2}
            template={3}
            bg="#007bff"
            font="#333333"
            fontFamily="Arial, sans-serif"
            id="validation-complete"
            className="test-class"
            props={{
              height: 40,
              name: 'Complete props',
              top: 10,
              line: 0.8
            }}
          />
        )
      },
      {
        name: 'Missing Optional Props',
        component: (
          <RightBlockBullet
            fac={1.0}
            bg="#28a745"
            font="#333333"
            fontFamily="Arial, sans-serif"
            id="validation-minimal"
            props={{
              height: 35,
              name: 'Minimal props (default template)',
              top: 5
            }}
          />
        )
      },
      {
        name: 'Empty Content',
        component: (
          <RightBlockBullet
            fac={1.2}
            template={1}
            bg="#dc3545"
            font="#333333"
            fontFamily="Arial, sans-serif"
            id="validation-empty"
            props={{
              height: 30,
              name: '',
              top: 0
            }}
          />
        )
      }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '20px' }}>
        {validationTests.map((test, index) => (
          <div key={test.name} style={{ position: 'relative' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#666' }}>
              {test.name}
            </h4>
            {test.component}
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Props validation testing with default values and missing optional props'
      }
    }
  }
};
