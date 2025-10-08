import type { Meta, StoryObj } from '@storybook/react';
import RightBlockPor, { RightBlockPorProps, RightBlockPorData } from './RightBlockPor';

// Mock data for consistent testing
const mockData: RightBlockPorData = {
  title: 'Senior Software Engineer',
  desc: '<p><strong>Led development</strong> of scalable React applications with TypeScript. Implemented modern UI/UX patterns and mentored junior developers.</p>',
  date: {
    startDate: '2022',
    endDate: '2024',
    optional: true
  },
  event: {
    value: 'Tech Corp',
    optional: true
  }
};

const baseArgs: RightBlockPorProps = {
  fac: 1,
  template: 1,
  props: {
    height: 35,
    top: 10,
    data: mockData,
    line: true
  },
  bg: '#ffffff',
  font: '#333333',
  fontFamily: 'Arial, sans-serif',
  id: 'rightblock-demo'
};

const meta: Meta<RightBlockPorProps> = {
  title: 'Resume/RightBlockPor',
  component: RightBlockPor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A consolidated React component for displaying resume block content with 5 template variations. Supports responsive scaling, conditional elements, and secure HTML rendering.'
      }
    }
  },
  argTypes: {
    fac: { 
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions and positions'
    },
    template: { 
      control: { type: 'select', options: [1, 2, 3, 4, 5] },
      description: 'Template variant controlling layout and styling'
    },
    bg: { 
      control: 'color',
      description: 'Background color of the block'
    },
    font: { 
      control: 'color',
      description: 'Text color for all content'
    },
    fontFamily: { 
      control: 'text',
      description: 'Font family for text elements'
    },
    id: { 
      control: 'text',
      description: 'HTML ID for the component'
    },
    className: { 
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<RightBlockPorProps>;

// Individual template stories with fixed configurations
export const Template1: Story = {
  name: 'Template 1 - Left Line',
  args: {
    ...baseArgs,
    template: 1
  }
};

export const Template2: Story = {
  name: 'Template 2 - Clean',
  args: {
    ...baseArgs,
    template: 2
  }
};

export const Template3: Story = {
  name: 'Template 3 - Conditional Line',
  args: {
    ...baseArgs,
    template: 3,
    props: {
      ...baseArgs.props,
      line: true // Show the conditional line
    }
  }
};

export const Template4: Story = {
  name: 'Template 4 - Center Dot',
  args: {
    ...baseArgs,
    template: 4
  }
};

export const Template5: Story = {
  name: 'Template 5 - Bordered with Dot',
  args: {
    ...baseArgs,
    template: 5,
    bg: '#f8f9fa'
  }
};

// Interactive playground with all controls
export const Playground: Story = {
  name: 'Interactive Playground',
  args: baseArgs
};

// Side-by-side comparison of all templates
export const AllTemplates: Story = {
  name: 'All Templates Comparison',
  render: (args) => (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      flexWrap: 'wrap',
      padding: '20px',
      position: 'relative',
      minHeight: '200px'
    }}>
      {([1, 2, 3, 4, 5] as const).map((templateNum) => (
        <div key={templateNum} style={{ position: 'relative', minWidth: '150px', minHeight: '120px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
            Template {templateNum}
          </h4>
          <RightBlockPor
            {...args}
            template={templateNum}
            id={`template-${templateNum}`}
            props={{
              ...args.props,
              top: 0,
              line: templateNum === 3 ? true : args.props.line
            }}
          />
        </div>
      ))}
    </div>
  ),
  args: baseArgs
};

// Responsive scaling demonstration
export const ResponsiveScaling: Story = {
  name: 'Responsive Scaling',
  render: (args) => (
    <div style={{ 
      display: 'flex', 
      gap: '30px', 
      alignItems: 'flex-start',
      padding: '20px',
      position: 'relative'
    }}>
      {[0.8, 1.0, 1.2, 1.5].map((scale) => (
        <div key={scale} style={{ position: 'relative' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>
            Scale: {scale}x
          </h4>
          <RightBlockPor
            {...args}
            fac={scale}
            id={`scale-${scale}`}
            props={{
              ...args.props,
              top: 0
            }}
          />
        </div>
      ))}
    </div>
  ),
  args: baseArgs
};

// Accessibility variations
export const HighContrast: Story = {
  name: 'High Contrast',
  args: {
    ...baseArgs,
    bg: '#000000',
    font: '#ffffff',
    template: 5
  }
};

export const LargeText: Story = {
  name: 'Large Text (1.5x Scale)',
  args: {
    ...baseArgs,
    fac: 1.5,
    template: 1
  }
};

// Different content variations
export const ShortContent: Story = {
  name: 'Minimal Content',
  args: {
    ...baseArgs,
    template: 2,
    props: {
      ...baseArgs.props,
      data: {
        title: 'Designer',
        desc: 'UI/UX design work.',
        date: {
          startDate: '2023',
          endDate: '2024',
          optional: false
        },
        event: {
          value: '',
          optional: false
        }
      }
    }
  }
};

export const LongContent: Story = {
  name: 'Extended Content',
  args: {
    ...baseArgs,
    template: 3,
    props: {
      ...baseArgs.props,
      height: 55,
      data: {
        title: 'Principal Software Architect & Team Lead',
        desc: '<p><strong>Architected</strong> and led development of enterprise-scale applications serving 10M+ users. <em>Established</em> CI/CD pipelines, code review processes, and mentoring programs. Technologies: React, TypeScript, Node.js, AWS, Docker, Kubernetes.</p>',
        date: {
          startDate: '2019',
          endDate: 'Present',
          optional: true
        },
        event: {
          value: 'Fortune 500 Technology Company',
          optional: true
        }
      },
      line: true
    }
  }
};

// Edge cases and error handling
export const NoDateOrEvent: Story = {
  name: 'No Date/Event Display',
  args: {
    ...baseArgs,
    template: 4,
    props: {
      ...baseArgs.props,
      data: {
        ...mockData,
        date: { ...mockData.date, optional: false },
        event: { ...mockData.event, optional: false }
      }
    }
  }
};

export const PlainTextDescription: Story = {
  name: 'Plain Text (No HTML)',
  args: {
    ...baseArgs,
    template: 1,
    props: {
      ...baseArgs.props,
      data: {
        ...mockData,
        desc: 'Simple plain text description without any HTML formatting or special characters.'
      }
    }
  }
};

// Performance and stress testing
export const MultipleBlocks: Story = {
  name: 'Multiple Blocks Performance',
  render: (args) => (
    <div style={{ position: 'relative', padding: '20px' }}>
      {Array.from({ length: 8 }, (_, i) => (
        <RightBlockPor
          key={i}
          {...args}
          template={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
          id={`perf-block-${i}`}
          props={{
            ...args.props,
            top: i * 60,
            data: {
              ...args.props.data,
              title: `Position ${i + 1}: ${args.props.data.title}`
            }
          }}
        />
      ))}
    </div>
  ),
  args: baseArgs
};
