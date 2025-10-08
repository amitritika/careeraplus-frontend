import type { Meta, StoryObj } from '@storybook/react';
import { RightBlockWorkExp } from './RightBlockWorkExp';
import type { RightBlockWorkExpProps } from './RightBlockWorkExp';

const meta: Meta<typeof RightBlockWorkExp> = {
  title: 'Components/RightBlockWorkExp',
  component: RightBlockWorkExp,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Work experience component with 5 template variations featuring different visual indicators and styling approaches.'
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
      description: 'Template variant selection'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color'
    },
    font: {
      control: { type: 'color' },
      description: 'Text and indicator color'
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
      description: 'Optional CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RightBlockWorkExp>;

// Mock data for consistent testing
const mockWorkExpData = {
  height: 80,
  top: 10,
  org: 'TechCorp Solutions',
  desg: 'Senior Software Engineer',
  startD: 'Jan 2020',
  endD: 'Dec 2023',
  role: '<p>Led development of scalable web applications</p><ul><li>Architected microservices infrastructure</li><li>Mentored junior developers</li><li>Implemented CI/CD pipelines</li></ul>'
};

const defaultArgs: Partial<RightBlockWorkExpProps> = {
  fac: 1,
  bg: 'rgb(240, 240, 240)',
  font: 'rgb(51, 51, 51)',
  fontFamily: 'Arial, sans-serif',
  id: 'work-exp-1',
  props: mockWorkExpData
};

// Individual template stories
export const Template1: Story = {
  args: { ...defaultArgs, template: 1 },
  parameters: {
    docs: { description: { story: 'Clean text-only layout without visual indicators.' } }
  }
};

export const Template2: Story = {
  args: { ...defaultArgs, template: 2 },
  parameters: {
    docs: { description: { story: 'Features a vertical line indicator on the left side.' } }
  }
};

export const Template3: Story = {
  args: { ...defaultArgs, template: 3 },
  parameters: {
    docs: { description: { story: 'Displays a filled circular dot as visual indicator.' } }
  }
};

export const Template4: Story = {
  args: { ...defaultArgs, template: 4 },
  parameters: {
    docs: { description: { story: 'Shows a hollow circular border as visual indicator.' } }
  }
};

export const Template5: Story = {
  args: { ...defaultArgs, template: 5 },
  parameters: {
    docs: { description: { story: 'Features a left border stripe with enhanced styling and larger title font.' } }
  }
};

// Interactive controls story
export const Interactive: Story = {
  args: { ...defaultArgs, template: 1 },
  parameters: {
    docs: { 
      description: { 
        story: 'Interactive playground with all available controls. Modify the properties to see live changes.' 
      } 
    }
  }
};

// Template showcase story
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseData = { ...mockWorkExpData, height: 60, role: undefined };
    const templates = [1, 2, 3, 4, 5] as const;
    
    return (
      <div style={{ display: 'flex', gap: '150px', flexWrap: 'wrap', padding: '20px' }}>
        {templates.map((template) => (
          <div key={template} style={{ position: 'relative', minWidth: '200px', minHeight: '100px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Template {template}</h4>
            <RightBlockWorkExp
              fac={1}
              template={template}
              bg="rgb(245, 245, 245)"
              font="rgb(66, 66, 66)"
              fontFamily="Segoe UI, sans-serif"
              id={`showcase-${template}`}
              props={showcaseData}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: { 
      description: { 
        story: 'Side-by-side comparison of all 5 template variations with consistent styling.' 
      } 
    }
  }
};

// Responsive scaling story
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.7, 1.0, 1.3, 1.6];
    const scaledData = { ...mockWorkExpData, role: undefined };
    
    return (
      <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start', padding: '20px' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ position: 'relative', minHeight: '120px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Scale {scale}x</h4>
            <RightBlockWorkExp
              fac={scale}
              template={3}
              bg="rgb(250, 250, 250)"
              font="rgb(51, 51, 51)"
              fontFamily="Arial, sans-serif"
              id={`scale-${scale}`}
              props={scaledData}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: { 
      description: { 
        story: 'Demonstrates responsive scaling behavior across different fac values using Template 3.' 
      } 
    }
  }
};

// Accessibility testing
export const AccessibilityTest: Story = {
  render: () => {
    const accessibilityVariants = [
      { name: 'High Contrast', bg: 'rgb(0, 0, 0)', font: 'rgb(255, 255, 255)' },
      { name: 'Large Text', bg: 'rgb(248, 248, 248)', font: 'rgb(34, 34, 34)', fac: 1.5 },
      { name: 'Color Blind Friendly', bg: 'rgb(240, 248, 255)', font: 'rgb(0, 51, 102)' }
    ];
    
    return (
      <div style={{ display: 'flex', gap: '200px', flexWrap: 'wrap', padding: '20px' }}>
        {accessibilityVariants.map((variant) => (
          <div key={variant.name} style={{ position: 'relative', minWidth: '250px', minHeight: '120px' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>{variant.name}</h4>
            <RightBlockWorkExp
              fac={variant.fac || 1}
              template={2}
              bg={variant.bg}
              font={variant.font}
              fontFamily="Arial, sans-serif"
              id={`accessibility-${variant.name.toLowerCase().replace(' ', '-')}`}
              props={{ ...mockWorkExpData, role: undefined }}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: { 
      description: { 
        story: 'Accessibility testing with high-contrast colors, large text scaling, and color-blind friendly palettes.' 
      } 
    }
  }
};

// Edge cases story
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      { name: 'Long Organization', data: { ...mockWorkExpData, org: 'Very Long Organization Name That Might Wrap', desg: 'Short Title', role: undefined } },
      { name: 'No Role Content', data: { ...mockWorkExpData, role: undefined } },
      { name: 'Minimal Content', data: { ...mockWorkExpData, org: 'ABC', desg: 'Dev', startD: '2023', endD: '2024', role: undefined } }
    ];
    
    return (
      <div style={{ display: 'flex', gap: '200px', flexWrap: 'wrap', padding: '20px' }}>
        {edgeCases.map((testCase) => (
          <div key={testCase.name} style={{ position: 'relative', minWidth: '250px', minHeight: '100px' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>{testCase.name}</h4>
            <RightBlockWorkExp
              fac={1}
              template={4}
              bg="rgb(252, 252, 252)"
              font="rgb(68, 68, 68)"
              fontFamily="Verdana, sans-serif"
              id={`edge-case-${testCase.name.toLowerCase().replace(' ', '-')}`}
              props={testCase.data}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: { 
      description: { 
        story: 'Edge case testing with long text content, missing optional data, and minimal content scenarios.' 
      } 
    }
  }
};
