import type { Meta, StoryObj } from '@storybook/react';
import BlockTraining from './BlockTraining';
import type { BlockTrainingProps } from './BlockTraining';

const meta: Meta<typeof BlockTraining> = {
  title: 'Components/BlockTraining',
  component: BlockTraining,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Work experience block component with 5 template variations for resume/CV layouts.'
      }
    }
  },
  argTypes: {
    fac: { 
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for dimensions and positioning'
    },
    template: { 
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variation (1-5)'
    },
    bg: { 
      control: { type: 'color' },
      description: 'Background color for bullet and accents'
    },
    font: { 
      control: { type: 'color' },
      description: 'Text color'
    },
    fontFamily: { 
      control: { type: 'text' },
      description: 'Font family (defaults to Calibri)'
    },
    id: { 
      control: { type: 'text' },
      description: 'DOM element ID'
    },
    className: { 
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof BlockTraining>;

// Mock data for consistent testing
const mockWorkExperience = {
  height: 60,
  top: 20,
  org: 'Tech Innovators Inc.',
  type: 'Software Engineer',
  desc: '<strong>Led development</strong> of scalable web applications using React and Node.js. <em>Collaborated</em> with cross-functional teams to deliver high-quality software solutions.',
  startD: '2022',
  endD: '2024',
  role: 'Senior Developer'
};

// Individual template stories with fixed configurations
export const Template1: Story = {
  args: {
    fac: 1.2,
    template: 1,
    bg: '#3b82f6',
    font: '#1f2937',
    fontFamily: 'Calibri',
    id: 'block-training-1',
    props: mockWorkExperience
  }
};

export const Template2: Story = {
  args: {
    fac: 1.2,
    template: 2,
    bg: '#ef4444',
    font: '#1f2937',
    fontFamily: 'Calibri',
    id: 'block-training-2',
    props: mockWorkExperience
  }
};

export const Template3: Story = {
  args: {
    fac: 1.2,
    template: 3,
    bg: '#10b981',
    font: '#1f2937',
    fontFamily: 'Calibri',
    id: 'block-training-3',
    props: mockWorkExperience
  }
};

export const Template4: Story = {
  args: {
    fac: 1.2,
    template: 4,
    bg: '#f59e0b',
    font: '#1f2937',
    fontFamily: 'Calibri',
    id: 'block-training-4',
    props: mockWorkExperience
  }
};

export const Template5: Story = {
  args: {
    fac: 1.2,
    template: 5,
    bg: 'rgb(139, 69, 19)',
    font: '#1f2937',
    fontFamily: 'Calibri',
    id: 'block-training-5',
    props: mockWorkExperience
  }
};

// Interactive controls story
export const Interactive: Story = {
  args: {
    fac: 1.5,
    template: 1,
    bg: '#6366f1',
    font: '#374151',
    fontFamily: 'Calibri',
    id: 'interactive-block',
    props: mockWorkExperience
  }
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const templates = [1, 2, 3, 4, 5] as const;
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b4513'];
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        padding: '20px' 
      }}>
        {templates.map((template, index) => (
          <div key={template} style={{ position: 'relative', height: '120px', border: '1px solid #e5e7eb' }}>
            <h4 style={{ margin: '5px', fontSize: '14px', textAlign: 'center' }}>Template {template}</h4>
            <BlockTraining
              fac={0.8}
              template={template}
              bg={colors[index]}
              font="#1f2937"
              id={`showcase-${template}`}
              props={mockWorkExperience}
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
    const scales = [0.8, 1.0, 1.2, 1.5];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ position: 'relative', height: `${scale * 80}px` }}>
            <h4 style={{ marginBottom: '10px' }}>Scale: {scale}x</h4>
            <BlockTraining
              fac={scale}
              template={5}
              bg="#7c3aed"
              font="#1f2937"
              id={`scale-${scale}`}
              props={mockWorkExperience}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Accessibility and contrast testing
export const AccessibilityTest: Story = {
  render: () => {
    const contrastCombinations = [
      { bg: '#000000', font: '#ffffff', name: 'High Contrast' },
      { bg: '#1f2937', font: '#f9fafb', name: 'Dark Theme' },
      { bg: '#fbbf24', font: '#1f2937', name: 'High Visibility' }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        {contrastCombinations.map((combo, index) => (
          <div key={combo.name} style={{ position: 'relative', height: '100px' }}>
            <h4 style={{ marginBottom: '10px' }}>{combo.name}</h4>
            <BlockTraining
              fac={1.3}
              template={1}
              bg={combo.bg}
              font={combo.font}
              id={`contrast-${index}`}
              props={mockWorkExperience}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Edge cases and validation
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      { 
        name: 'Long Content',
        props: { ...mockWorkExperience, desc: 'Very long description that tests how the component handles extensive content and text wrapping behavior in various template configurations.' }
      },
      { 
        name: 'Minimal Content',
        props: { ...mockWorkExperience, desc: 'Brief.' }
      },
      { 
        name: 'Special Characters',
        props: { ...mockWorkExperience, org: 'Café & Co. — "Innovation" Ltd.' }
      }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', padding: '20px' }}>
        {edgeCases.map((testCase, index) => (
          <div key={testCase.name} style={{ position: 'relative', height: '120px' }}>
            <h4 style={{ marginBottom: '10px' }}>{testCase.name}</h4>
            <BlockTraining
              fac={1.2}
              template={5}
              bg="#dc2626"
              font="#374151"
              id={`edge-${index}`}
              props={testCase.props}
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
    <div style={{ position: 'relative', height: '100px', padding: '20px' }}>
      <h4 style={{ marginBottom: '10px' }}>Default Props & Missing Optionals</h4>
      <BlockTraining
        fac={1.0}
        template={1}
        bg="#4f46e5"
        font="#111827"
        id="validation-test"
        props={mockWorkExperience}
        // fontFamily and className intentionally omitted to test defaults
      />
    </div>
  )
};
