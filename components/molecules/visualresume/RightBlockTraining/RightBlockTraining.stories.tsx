import type { Meta, StoryObj } from '@storybook/react';
import { RightBlockTraining, type RightBlockTrainingProps } from './RightBlockTraining';

const meta: Meta<typeof RightBlockTraining> = {
  title: 'Components/RightBlockTraining',
  component: RightBlockTraining,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A consolidated training/work experience block component supporting 5 template variations with pixel-perfect visual parity.'
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
      description: 'Template variation (1-5)'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color (CSS color value)'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color (CSS color value)'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Optional font family'
    },
    id: {
      control: { type: 'text' },
      description: 'Component ID'
    },
    className: {
      control: { type: 'text' },
      description: 'Optional CSS class name'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RightBlockTraining>;

// Mock data for consistent testing
const mockWorkData = {
  height: 60,
  org: 'Tech Solutions Inc.',
  type: 'Training',
  desc: 'Advanced React development training focusing on TypeScript integration and performance optimization techniques.',
  startD: '2023',
  endD: '2024',
  top: 15,
  role: 'Senior Developer Training Program'
};

// Default story with interactive controls
export const Default: Story = {
  args: {
    fac: 1,
    bg: 'rgb(59, 130, 246)',
    font: 'rgb(51, 65, 85)',
    id: 'training-block-default',
    template: 1,
    props: mockWorkData,
    fontFamily: 'Inter, sans-serif'
  }
};

// Individual template demonstrations
export const Template1: Story = {
  args: {
    ...Default.args,
    template: 1,
    id: 'training-template-1'
  }
};

export const Template2: Story = {
  args: {
    ...Default.args,
    template: 2,
    id: 'training-template-2'
  }
};

export const Template3: Story = {
  args: {
    ...Default.args,
    template: 3,
    id: 'training-template-3',
    bg: 'rgb(168, 85, 247)' // Different color to highlight negative positioning
  }
};

export const Template4: Story = {
  args: {
    ...Default.args,
    template: 4,
    id: 'training-template-4'
  }
};

export const Template5: Story = {
  args: {
    ...Default.args,
    template: 5,
    id: 'training-template-5',
    bg: 'rgb(34, 197, 94)' // Green to highlight border effect
  }
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const templates = [1, 2, 3, 4, 5] as const;
    const colors = [
      'rgb(59, 130, 246)',   // Blue
      'rgb(147, 51, 234)',   // Purple  
      'rgb(168, 85, 247)',   // Violet
      'rgb(236, 72, 153)',   // Pink
      'rgb(34, 197, 94)'     // Green
    ];

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {templates.map((template, index) => (
          <div key={template} style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
              Template {template}
            </h4>
            <RightBlockTraining
              fac={1}
              bg={colors[index]}
              font="rgb(51, 65, 85)"
              id={`showcase-template-${template}`}
              template={template}
              props={mockWorkData}
              fontFamily="Inter, sans-serif"
            />
          </div>
        ))}
      </div>
    );
  }
};

// Responsive scaling demonstration
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.7, 1, 1.5];
    
    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {scales.map(scale => (
          <div key={scale} style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
              Scale: {scale}x
            </h4>
            <RightBlockTraining
              fac={scale}
              bg="rgb(59, 130, 246)"
              font="rgb(51, 65, 85)"
              id={`responsive-${scale}`}
              template={1}
              props={mockWorkData}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Accessibility testing with high contrast
export const HighContrast: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#000' }}>
      <RightBlockTraining
        fac={1.2}
        bg="rgb(255, 255, 0)"
        font="rgb(255, 255, 255)"
        id="high-contrast-test"
        template={5}
        props={{
          ...mockWorkData,
          desc: 'High contrast version for accessibility testing with larger text and bright colors.'
        }}
        fontFamily="Arial, sans-serif"
      />
    </div>
  )
};

// Edge cases with extreme values
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        title: 'Minimal Content',
        data: {
          height: 30,
          org: 'Co.',
          type: 'T',
          desc: 'Short',
          startD: '23',
          endD: '24',
          top: 5,
          role: 'Dev'
        }
      },
      {
        title: 'Maximum Content',
        data: {
          height: 120,
          org: 'Very Long Technology Solutions Company Name Inc.',
          type: 'Comprehensive Training Program',
          desc: 'This is an extremely long description that tests how the component handles extensive content with multiple lines and detailed information about the training program including technical specifications and requirements.',
          startD: '2020',
          endD: 'Present',
          top: 25,
          role: 'Senior Full-Stack Development Lead Training Specialist'
        }
      }
    ];

    return (
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {edgeCases.map((testCase, index) => (
          <div key={index} style={{ textAlign: 'center', maxWidth: '300px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
              {testCase.title}
            </h4>
            <RightBlockTraining
              fac={1}
              bg="rgb(168, 85, 247)"
              font="rgb(51, 65, 85)"
              id={`edge-case-${index}`}
              template={3}
              props={testCase.data}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Props validation with defaults
export const PropsValidation: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          With Optional Props
        </h4>
        <RightBlockTraining
          fac={1}
          bg="rgb(34, 197, 94)"
          font="rgb(15, 23, 42)"
          id="with-optionals"
          template={5}
          props={mockWorkData}
          className="custom-training-block"
          fontFamily="Georgia, serif"
        />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          Minimal Required Props
        </h4>
        <RightBlockTraining
          fac={1}
          bg="rgb(239, 68, 68)"
          font="rgb(15, 23, 42)"
          id="minimal-props"
          template={2}
          props={mockWorkData}
        />
      </div>
    </div>
  )
};
