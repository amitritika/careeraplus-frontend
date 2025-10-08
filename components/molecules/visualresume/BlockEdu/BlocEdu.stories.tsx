import type { Meta, StoryObj } from '@storybook/react';
import { BlockEdu, BlockEduProps, EducationData } from './BlockEdu';

const meta: Meta<typeof BlockEdu> = {
  title: 'Components/BlockEdu',
  component: BlockEdu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A consolidated education block component supporting 5 template variations with configurable styling and positioning.',
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
      description: 'Template variant (1-5)',
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color',
    },
    font: {
      control: { type: 'color' },
      description: 'Font color',
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family override',
    },
    id: {
      control: { type: 'text' },
      description: 'Unique component ID',
    },
    className: {
      control: { type: 'text' },
      description: 'Custom CSS class name',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock education data
const mockEducationData: EducationData = {
  degree: 'B.Tech Computer Science',
  college: 'MIT University',
  year: '2020-2024',
  cgpa: 'CGPA: 8.5/10',
};

const defaultArgs: Partial<BlockEduProps> = {
  fac: 1,
  props: {
    height: 50,
    top: 20,
    line: 0.8,
    data: mockEducationData,
  },
  bg: '#f0f0f0',
  font: '#333333',
  id: 'edu-block-story',
  fontFamily: 'arial',
};

// Individual template stories
export const Template1: Story = {
  args: { ...defaultArgs, template: 1 },
  parameters: {
    docs: { description: { story: 'Basic template with no decorative line elements' } }
  }
};

export const Template2: Story = {
  args: { ...defaultArgs, template: 2 },
  parameters: {
    docs: { description: { story: 'Template with full-height vertical line and opacity control' } }
  }
};

export const Template3: Story = {
  args: { ...defaultArgs, template: 3 },
  parameters: {
    docs: { description: { story: 'Vertical line template with adjusted icon positioning and background-colored icon' } }
  }
};

export const Template4: Story = {
  args: { ...defaultArgs, template: 4 },
  parameters: {
    docs: { description: { story: 'Template with small horizontal accent line and background-colored icon' } }
  }
};

export const Template5: Story = {
  args: { ...defaultArgs, template: 5 },
  parameters: {
    docs: { description: { story: 'Compact template with horizontal accent line and adjusted main positioning' } }
  }
};

// Interactive controls story with manual state management
export const InteractiveControls: Story = {
  render: (args) => {
    // This story provides interactive controls via component props
    return (
      <div style={{ position: 'relative', padding: '20px' }}>
        <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
          Use the controls panel to adjust component properties. 
          To modify nested props (height, top, line, education data), 
          use the Template Customization story below.
        </div>
        <div style={{ position: 'relative', height: '100px', width: '300px', border: '1px dashed #ccc' }}>
          <BlockEdu {...args} />
        </div>
      </div>
    );
  },
  args: defaultArgs,
  parameters: {
    docs: { 
      description: { 
        story: 'Interactive story with controls for all top-level component properties. Use the controls panel to adjust fac, template, colors, and styling.' 
      } 
    }
  }
};

// Template customization with predefined variations
export const TemplateCustomization: Story = {
  render: () => {
    const customizations = [
      {
        title: 'Large Scale with Long Content',
        props: {
          fac: 1.4,
          template: 1 as const,
          bg: '#e8f5e8',
          font: '#2d5016',
          blockProps: {
            height: 60,
            top: 15,
            data: {
              degree: 'Master of Computer Applications',
              college: 'Stanford University',
              year: '2021-2023',
              cgpa: 'GPA: 3.9/4.0',
            }
          }
        }
      },
      {
        title: 'Compact with Vertical Line',
        props: {
          fac: 0.8,
          template: 3 as const,
          bg: '#fff3cd',
          font: '#856404',
          blockProps: {
            height: 35,
            top: 10,
            line: 0.6,
            data: {
              degree: 'PhD CS',
              college: 'MIT',
              year: '2024',
              cgpa: '4.0',
            }
          }
        }
      },
      {
        title: 'High Contrast with Horizontal Line',
        props: {
          fac: 1.2,
          template: 4 as const,
          bg: '#343a40',
          font: '#ffffff',
          blockProps: {
            height: 55,
            top: 25,
            data: {
              degree: 'B.Sc Mathematics',
              college: 'Oxford University',
              year: '2018-2022',
              cgpa: 'First Class Honours',
            }
          }
        }
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Template Customization Examples
        </div>
        {customizations.map((custom, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: '500' }}>
              {custom.title}
            </div>
            <div style={{ 
              position: 'relative', 
              height: `${80 * custom.props.fac}px`, 
              width: `${250 * custom.props.fac}px`, 
              border: '1px solid #ddd',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <BlockEdu
                fac={custom.props.fac}
                props={custom.props.blockProps}
                bg={custom.props.bg}
                font={custom.props.font}
                id={`custom-${index}`}
                template={custom.props.template}
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
        story: 'Predefined customization examples showing different combinations of scaling, templates, colors, and content.' 
      } 
    }
  }
};

// Template showcase story
export const AllTemplatesShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '20px' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
        BlockEdu Templates Side-by-Side Comparison
      </div>
      {[1, 2, 3, 4, 5].map((templateNum) => (
        <div key={templateNum} style={{ position: 'relative', height: '80px', border: '1px dashed #ccc' }}>
          <div style={{ position: 'absolute', top: '-20px', left: '0', fontSize: '14px', fontWeight: 'bold' }}>
            Template {templateNum}
          </div>
          <BlockEdu
            fac={1}
            props={{
              height: 50,
              top: 20,
              line: 0.8,
              data: mockEducationData,
            }}
            bg="#e8f4f8"
            font="#2c3e50"
            id={`showcase-${templateNum}`}
            template={templateNum as 1 | 2 | 3 | 4 | 5}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Side-by-side comparison of all 5 template variations' } }
  }
};

// Responsive scaling story
export const ResponsiveScaling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
      {[0.7, 1.0, 1.3, 1.6].map((scale) => (
        <div key={scale} style={{ position: 'relative' }}>
          <div style={{ marginBottom: '10px', fontSize: '12px', textAlign: 'center' }}>
            Scale: {scale}x
          </div>
          <div style={{ position: 'relative', height: `${80 * scale}px`, width: `${200 * scale}px`, border: '1px solid #ddd' }}>
            <BlockEdu
              fac={scale}
              props={{
                height: 50,
                top: 10,
                line: 0.8,
                data: mockEducationData,
              }}
              bg="#fff3cd"
              font="#856404"
              id={`responsive-${scale}`}
              template={2}
            />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Responsive scaling demonstration at different fac values' } }
  }
};

// Accessibility testing story
export const AccessibilityTesting: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Accessibility Variations</div>

      {/* High contrast */}
      <div style={{ position: 'relative', height: '80px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>High Contrast</div>
        <BlockEdu
          fac={1}
          props={{ height: 50, top: 20, line: 1, data: mockEducationData }}
          bg="#000000"
          font="#ffffff"
          id="accessibility-high-contrast"
          template={2}
        />
      </div>

      {/* Large text */}
      <div style={{ position: 'relative', height: '100px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>Large Scale (1.5x)</div>
        <BlockEdu
          fac={1.5}
          props={{ height: 50, top: 20, line: 0.8, data: mockEducationData }}
          bg="#f8f9fa"
          font="#212529"
          id="accessibility-large"
          template={3}
        />
      </div>

      {/* Color blind friendly */}
      <div style={{ position: 'relative', height: '80px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>Color Blind Friendly</div>
        <BlockEdu
          fac={1}
          props={{ height: 50, top: 20, line: 0.9, data: mockEducationData }}
          bg="#0066cc"
          font="#ffffff"
          id="accessibility-colorblind"
          template={4}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Accessibility-focused variations with high contrast, large text, and color blind friendly options' } }
  }
};

// Edge cases testing
export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      {/* Long text content */}
      <div style={{ position: 'relative', height: '80px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>Long Content Text</div>
        <BlockEdu
          fac={1}
          props={{
            height: 60,
            top: 20,
            line: 0.8,
            data: {
              degree: 'Master of Technology in Computer Science and Engineering',
              college: 'Indian Institute of Technology, Bombay',
              year: '2019-2023',
              cgpa: 'CGPA: 9.2/10',
            },
          }}
          bg="#e9ecef"
          font="#495057"
          id="edge-long-content"
          template={1}
        />
      </div>

      {/* Minimal content */}
      <div style={{ position: 'relative', height: '60px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>Minimal Content</div>
        <BlockEdu
          fac={1}
          props={{
            height: 40,
            top: 10,
            line: 0.5,
            data: {
              degree: 'PhD',
              college: 'MIT',
              year: '2024',
              cgpa: '4.0',
            },
          }}
          bg="#fff3cd"
          font="#856404"
          id="edge-minimal"
          template={4}
        />
      </div>

      {/* Zero opacity line */}
      <div style={{ position: 'relative', height: '80px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>Zero Opacity Line</div>
        <BlockEdu
          fac={1}
          props={{
            height: 50,
            top: 20,
            line: 0,
            data: mockEducationData,
          }}
          bg="#d1ecf1"
          font="#0c5460"
          id="edge-zero-opacity"
          template={3}
        />
      </div>

      {/* Very small scale */}
      <div style={{ position: 'relative', height: '40px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>Very Small Scale (0.5x)</div>
        <BlockEdu
          fac={0.5}
          props={{
            height: 50,
            top: 20,
            line: 1,
            data: mockEducationData,
          }}
          bg="#f0f8ff"
          font="#4682b4"
          id="edge-small-scale"
          template={5}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Edge cases testing with extreme content lengths, property values, and scaling' } }
  }
};

// Props validation story
export const PropsValidation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Props Validation Examples</div>

      {/* Default values fallback */}
      <div style={{ position: 'relative', height: '80px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>With Default Template (should use template 1)</div>
        <BlockEdu
          fac={1}
          props={{
            height: 50,
            top: 20,
            data: mockEducationData,
          }}
          bg="#f8f9fa"
          font="#212529"
          id="validation-default-template"
          // No template specified - should default to 1
        />
      </div>

      {/* Extreme scaling */}
      <div style={{ position: 'relative', height: '120px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>Extreme Scaling (fac: 2.0)</div>
        <BlockEdu
          fac={2.0}
          props={{
            height: 30,
            top: 10,
            line: 1,
            data: {
              degree: 'B.Sc',
              college: 'XYZ',
              year: '2024',
              cgpa: '3.8',
            },
          }}
          bg="#d4edda"
          font="#155724"
          id="validation-extreme-scale"
          template={3}
        />
      </div>

      {/* Missing optional props */}
      <div style={{ position: 'relative', height: '80px' }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>Missing Optional Props (no className, default fontFamily)</div>
        <BlockEdu
          fac={1}
          props={{
            height: 45,
            top: 20,
            data: mockEducationData,
          }}
          bg="#e2e3e5"
          font="#383d41"
          id="validation-missing-optional"
          template={2}
          // fontFamily and className omitted
        />
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Validation of component behavior with edge case prop values and missing optional properties' } }
  }
};