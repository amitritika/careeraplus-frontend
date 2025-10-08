import type { Meta, StoryObj } from '@storybook/react';
import BlockProject from './BlockProject';

const meta: Meta<typeof BlockProject> = {
  title: 'Components/BlockProject',
  component: BlockProject,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A project block component with 5 different template variations for resume layouts. Supports responsive scaling, conditional metadata display, and various visual styles including icons, lines, and borders.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 2, step: 0.1 },
      description: 'Scaling factor for responsive design'
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variant (1-5)'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color for icons and lines'
    },
    font: {
      control: { type: 'color' },
      description: 'Text color'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family'
    },
    id: {
      control: { type: 'text' },
      description: 'Component ID'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for consistent testing
const mockProjectData = {
  title: "E-commerce Platform Development",
  desc: "Developed a comprehensive online shopping platform with <strong>React</strong>, Node.js, and MongoDB. Implemented features including user authentication, payment processing, inventory management, and real-time notifications.",
  designation: {
    value: "Senior Full Stack Developer",
    optional: true
  },
  date: {
    startDate: "Jan 2023",
    endDate: "Dec 2023",
    optional: true
  },
  client: {
    value: "TechCorp Solutions",
    optional: true
  }
};

const defaultProps = {
  height: 60,
  top: 0,
  data: mockProjectData,
  line: true
};

// Individual Template Stories
export const Template1: Story = {
  args: {
    fac: 1,
    template: 1,
    props: defaultProps,
    bg: 'rgb(52, 152, 219)',
    font: 'rgb(44, 62, 80)',
    fontFamily: 'Arial, sans-serif'
  }
};

export const Template2: Story = {
  args: {
    fac: 1,
    template: 2,
    props: defaultProps,
    bg: 'rgb(46, 204, 113)',
    font: 'rgb(44, 62, 80)',
    fontFamily: 'Arial, sans-serif'
  }
};

export const Template3: Story = {
  args: {
    fac: 1,
    template: 3,
    props: defaultProps,
    bg: 'rgb(155, 89, 182)',
    font: 'rgb(44, 62, 80)',
    fontFamily: 'Arial, sans-serif'
  }
};

export const Template4: Story = {
  args: {
    fac: 1,
    template: 4,
    props: defaultProps,
    bg: 'rgb(230, 126, 34)',
    font: 'rgb(44, 62, 80)',
    fontFamily: 'Arial, sans-serif'
  }
};

export const Template5: Story = {
  args: {
    fac: 1,
    template: 5,
    props: defaultProps,
    bg: 'rgb(231, 76, 60)',
    font: 'rgb(44, 62, 80)',
    fontFamily: 'Arial, sans-serif'
  }
};

// Interactive Controls Story
export const Interactive: Story = {
  args: {
    fac: 1,
    template: 1,
    props: defaultProps,
    bg: 'rgb(52, 152, 219)',
    font: 'rgb(44, 62, 80)',
    fontFamily: 'Arial, sans-serif'
  }
};

// Template Showcase with Side-by-Side Comparison
export const TemplateShowcase: Story = {
  render: () => {
    const templates = [1, 2, 3, 4, 5] as const;
    const colors = [
      'rgb(52, 152, 219)',
      'rgb(46, 204, 113)', 
      'rgb(155, 89, 182)',
      'rgb(230, 126, 34)',
      'rgb(231, 76, 60)'
    ];
    
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {templates.map((template, index) => (
          <div key={template} style={{ 
            position: 'relative', 
            width: '200px', 
            height: '120px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px'
          }}>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              marginBottom: '5px',
              color: '#666'
            }}>
              Template {template}
            </div>
            <BlockProject
              fac={0.8}
              template={template}
              props={{
                ...defaultProps,
                height: 50,
                data: {
                  ...mockProjectData,
                  title: "Project Title",
                  desc: "Brief project description here..."
                }
              }}
              bg={colors[index]}
              font="rgb(44, 62, 80)"
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  }
};

// Responsive Scaling Story
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.7, 1, 1.3, 1.6];
    
    return (
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ 
            position: 'relative',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '15px',
            width: `${180 * scale + 30}px`,
            height: `${80 * scale + 30}px`
          }}>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              color: '#666'
            }}>
              Scale: {scale}x
            </div>
            <BlockProject
              fac={scale}
              template={3}
              props={{
                ...defaultProps,
                height: 60,
                data: {
                  ...mockProjectData,
                  desc: "Scaled project description"
                }
              }}
              bg="rgb(155, 89, 182)"
              font="rgb(44, 62, 80)"
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  }
};

// Accessibility Testing
export const AccessibilityTesting: Story = {
  render: () => {
    const variants = [
      { name: 'Default', bg: 'rgb(52, 152, 219)', font: 'rgb(44, 62, 80)' },
      { name: 'High Contrast', bg: 'rgb(0, 0, 0)', font: 'rgb(255, 255, 255)' },
      { name: 'Large Text', bg: 'rgb(52, 152, 219)', font: 'rgb(44, 62, 80)', scale: 1.5 }
    ];
    
    return (
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        {variants.map((variant) => (
          <div key={variant.name} style={{ 
            position: 'relative',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '15px',
            backgroundColor: variant.name === 'High Contrast' ? '#333' : 'white'
          }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              color: variant.name === 'High Contrast' ? 'white' : '#666'
            }}>
              {variant.name}
            </div>
            <BlockProject
              fac={variant.scale || 1}
              template={2}
              props={defaultProps}
              bg={variant.bg}
              font={variant.font}
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  }
};

// Edge Cases Story
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        name: 'No Metadata',
        data: {
          ...mockProjectData,
          designation: { value: '', optional: false },
          date: { startDate: '', endDate: '', optional: false },
          client: { value: '', optional: false }
        }
      },
      {
        name: 'Very Long Title',
        data: {
          ...mockProjectData,
          title: 'Enterprise-Level Multi-Tenant SaaS Platform with Advanced Analytics and Real-time Collaboration Features'
        }
      },
      {
        name: 'HTML Content',
        data: {
          ...mockProjectData,
          desc: 'Built with <em>modern technologies</em> including <strong>React</strong>, <u>TypeScript</u>, and <mark>GraphQL</mark>.'
        }
      },
      {
        name: 'Minimal Content',
        data: {
          title: 'App',
          desc: 'Simple mobile app.',
          designation: { value: 'Dev', optional: true },
          date: { startDate: '2023', endDate: '2024', optional: true },
          client: { value: 'Client', optional: true }
        }
      }
    ];
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {edgeCases.map((testCase, index) => (
          <div key={testCase.name} style={{ 
            position: 'relative',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '15px',
            height: '120px'
          }}>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              color: '#666'
            }}>
              {testCase.name}
            </div>
            <BlockProject
              fac={0.9}
              template={(index % 5) + 1 as 1 | 2 | 3 | 4 | 5}
              props={{
                height: 60,
                top: 0,
                data: testCase.data as any,
                line: true
              }}
              bg="rgb(52, 152, 219)"
              font="rgb(44, 62, 80)"
              fontFamily="Arial, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  }
};

// Props Validation Story
export const PropsValidation: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <div style={{ 
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '15px'
        }}>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            marginBottom: '10px',
            color: '#666'
          }}>
            Default Values Test
          </div>
          <BlockProject
            fac={1}
            props={{
              height: 50,
              top: 0,
              data: {
                title: 'Default Test',
                desc: 'Testing default values',
                designation: { value: 'Developer', optional: true },
                date: { startDate: '2023', endDate: '2024', optional: true },
                client: { value: 'Test Client', optional: true }
              },
              line: true
            }}
            bg="rgb(52, 152, 219)"
            font="rgb(44, 62, 80)"
          />
        </div>
        
        <div style={{ 
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '15px'
        }}>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            marginBottom: '10px',
            color: '#666'
          }}>
            Custom Properties Test
          </div>
          <BlockProject
            fac={1.2}
            template={5}
            props={{
              height: 70,
              top: 5,
              data: mockProjectData,
              line: false
            }}
            bg="rgb(231, 76, 60)"
            font="rgb(44, 62, 80)"
            fontFamily="Georgia, serif"
            id="custom-block"
            className="custom-project-block"
          />
        </div>
      </div>
    );
  }
};
