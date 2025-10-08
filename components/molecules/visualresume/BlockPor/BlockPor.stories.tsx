import type { Meta, StoryObj } from '@storybook/react';
import BlockPor from './BlockPor';
import { BlockPorProps } from './BlockPor';

const meta: Meta<typeof BlockPor> = {
  title: 'Components/BlockPor',
  component: BlockPor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BlockPor component with 5 different template variations for portfolio/resume blocks. Supports scaling, custom colors, and conditional content display.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for responsive sizing'
    },
    template: {
      control: { type: 'select', options: [1, 2, 3, 4, 5] },
      description: 'Template variant (1-5)'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color for lines and indicators'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color for text content'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family for text'
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

// Mock data for stories
const mockData = {
  title: 'Senior Frontend Developer',
  desc: '<p>Led development of React-based dashboard with <strong>TypeScript</strong> and modern tooling. Improved performance by 40% through optimization.</p>',
  date: {
    startDate: '2022',
    endDate: '2024',
    optional: true
  },
  event: {
    value: 'TechCorp Inc.',
    optional: true
  }
};

const mockProps = {
  height: 45,
  top: 0,
  line: true,
  data: mockData
};

// Individual Template Stories
export const Template1: Story = {
  args: {
    fac: 1,
    template: 1,
    bg: 'rgb(59, 130, 246)',
    font: 'rgb(31, 41, 55)',
    fontFamily: 'Inter, sans-serif',
    id: 'block-por-1',
    props: mockProps
  }
};

export const Template2: Story = {
  args: {
    fac: 1,
    template: 2,
    bg: 'rgb(16, 185, 129)',
    font: 'rgb(31, 41, 55)',
    fontFamily: 'Inter, sans-serif',
    id: 'block-por-2',
    props: mockProps
  }
};

export const Template3: Story = {
  args: {
    fac: 1,
    template: 3,
    bg: 'rgb(245, 101, 101)',
    font: 'rgb(31, 41, 55)',
    fontFamily: 'Inter, sans-serif',
    id: 'block-por-3',
    props: mockProps
  }
};

export const Template4: Story = {
  args: {
    fac: 1,
    template: 4,
    bg: 'rgb(168, 85, 247)',
    font: 'rgb(31, 41, 55)',
    fontFamily: 'Inter, sans-serif',
    id: 'block-por-4',
    props: mockProps
  }
};

export const Template5: Story = {
  args: {
    fac: 1,
    template: 5,
    bg: 'rgb(251, 146, 60)',
    font: 'rgb(31, 41, 55)',
    fontFamily: 'Inter, sans-serif',
    id: 'block-por-5',
    props: mockProps
  }
};

// Interactive Controls Story
export const InteractiveDemo: Story = {
  args: {
    fac: 1.2,
    template: 1,
    bg: 'rgb(59, 130, 246)',
    font: 'rgb(31, 41, 55)',
    fontFamily: 'Inter, sans-serif',
    id: 'interactive-demo',
    props: mockProps
  }
};

// Template Showcase with Side-by-Side Comparison
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseData = {
      title: 'Full Stack Developer',
      desc: '<p>Built scalable web applications using <em>React</em>, <strong>Node.js</strong>, and cloud technologies.</p>',
      date: {
        startDate: '2021',
        endDate: '2023',
        optional: true
      },
      event: {
        value: 'StartupXYZ',
        optional: true
      }
    };

    const showcaseProps = {
      height: 50,
      top: 0,
      line: true,
      data: showcaseData
    };

    const templates = [
      { template: 1, bg: 'rgb(59, 130, 246)', name: 'Template 1' },
      { template: 2, bg: 'rgb(16, 185, 129)', name: 'Template 2' },
      { template: 3, bg: 'rgb(245, 101, 101)', name: 'Template 3' },
      { template: 4, bg: 'rgb(168, 85, 247)', name: 'Template 4' },
      { template: 5, bg: 'rgb(251, 146, 60)', name: 'Template 5' }
    ];

    return (
      <div style={{ display: 'flex', gap: '250px', flexWrap: 'wrap', padding: '20px' }}>
        {templates.map(({ template, bg, name }) => (
          <div key={template} style={{ position: 'relative', minHeight: '80px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{name}</h4>
            <BlockPor
              fac={0.8}
              template={template as 1 | 2 | 3 | 4 | 5}
              bg={bg}
              font="rgb(31, 41, 55)"
              fontFamily="Inter, sans-serif"
              props={showcaseProps}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Responsive Scaling Demo
export const ResponsiveScaling: Story = {
  render: () => {
    const scalingData = {
      title: 'UI/UX Designer',
      desc: '<p>Created intuitive user interfaces with focus on <strong>accessibility</strong> and user experience.</p>',
      date: {
        startDate: '2020',
        endDate: '2022',
        optional: true
      },
      event: {
        value: 'Design Studio',
        optional: true
      }
    };

    const scalingProps = {
      height: 40,
      top: 0,
      line: true,
      data: scalingData
    };

    const scales = [0.7, 1.0, 1.3, 1.6];

    return (
      <div style={{ display: 'flex', gap: '200px', alignItems: 'flex-start', padding: '20px' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ position: 'relative', minHeight: '100px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Scale: {scale}x</h4>
            <BlockPor
              fac={scale}
              template={3}
              bg="rgb(59, 130, 246)"
              font="rgb(31, 41, 55)"
              fontFamily="Inter, sans-serif"
              props={scalingProps}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Accessibility Testing
export const AccessibilityVariants: Story = {
  render: () => {
    const accessibilityData = {
      title: 'Accessibility Specialist',
      desc: '<p>Implemented <strong>WCAG 2.1 AA</strong> standards across web applications for inclusive design.</p>',
      date: {
        startDate: '2023',
        endDate: '2024',
        optional: true
      },
      event: {
        value: 'Inclusive Tech',
        optional: true
      }
    };

    const accessibilityProps = {
      height: 55,
      top: 0,
      line: true,
      data: accessibilityData
    };

    const variants = [
      { 
        name: 'High Contrast', 
        bg: 'rgb(0, 0, 0)', 
        font: 'rgb(255, 255, 255)',
        containerBg: 'rgb(255, 255, 255)'
      },
      { 
        name: 'Large Text', 
        bg: 'rgb(59, 130, 246)', 
        font: 'rgb(31, 41, 55)',
        fac: 1.5,
        containerBg: 'rgb(249, 250, 251)'
      },
      { 
        name: 'Color Blind Safe', 
        bg: 'rgb(34, 197, 94)', 
        font: 'rgb(22, 78, 99)',
        containerBg: 'rgb(254, 249, 195)'
      }
    ];

    return (
      <div style={{ display: 'flex', gap: '250px', padding: '20px' }}>
        {variants.map((variant, index) => (
          <div 
            key={variant.name} 
            style={{ 
              position: 'relative', 
              minHeight: '100px',
              backgroundColor: variant.containerBg,
              padding: '15px',
              borderRadius: '8px'
            }}
          >
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>{variant.name}</h4>
            <BlockPor
              fac={variant.fac || 1}
              template={4}
              bg={variant.bg}
              font={variant.font}
              fontFamily="Inter, sans-serif"
              props={accessibilityProps}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Edge Cases Testing
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        name: 'Long Title',
        data: {
          ...mockData,
          title: 'Senior Full Stack Software Engineer & Technical Lead',
          desc: '<p>Short description.</p>'
        }
      },
      {
        name: 'No Date/Event',
        data: {
          ...mockData,
          date: { ...mockData.date, optional: false },
          event: { ...mockData.event, optional: false }
        }
      },
      {
        name: 'Minimal Content',
        data: {
          title: 'Dev',
          desc: '<p>Work.</p>',
          date: { startDate: '2024', endDate: '2024', optional: true },
          event: { value: 'Co', optional: true }
        }
      }
    ];

    return (
      <div style={{ display: 'flex', gap: '250px', padding: '20px' }}>
        {edgeCases.map((testCase, index) => (
          <div key={testCase.name} style={{ position: 'relative', minHeight: '80px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{testCase.name}</h4>
            <BlockPor
              fac={1}
              template={5}
              bg="rgb(59, 130, 246)"
              font="rgb(31, 41, 55)"
              fontFamily="Inter, sans-serif"
              props={{
                height: 45,
                top: 0,
                line: true,
                data: testCase.data
              }}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Props Validation
export const DefaultValues: Story = {
  args: {
    fac: 1,
    template: 1,
    bg: 'rgb(107, 114, 128)',
    font: 'rgb(31, 41, 55)',
    props: {
      height: 40,
      top: 0,
      data: {
        title: 'Default Configuration',
        desc: '<p>Testing default prop values and fallbacks.</p>',
        date: {
          startDate: '2024',
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
