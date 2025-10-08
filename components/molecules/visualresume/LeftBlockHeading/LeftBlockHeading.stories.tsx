import type { Meta, StoryObj } from '@storybook/react';
import LeftBlockHeading, { LeftBlockHeadingProps } from './LeftBlockHeading';
import { FaUser, FaBriefcase, FaGraduationCap, FaPhone, FaEnvelope } from 'react-icons/fa';

const meta: Meta<typeof LeftBlockHeading> = {
  title: 'Components/LeftBlockHeading',
  component: LeftBlockHeading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A consolidated heading component supporting 5 template variations with optional icons, responsive scaling, and customizable styling.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for responsive design'
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variant selection'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background/border color'
    },
    font: {
      control: { type: 'color' },
      description: 'Text color'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family for heading text'
    },
    id: {
      control: { type: 'text' },
      description: 'HTML id attribute'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class names'
    }
  }
};

export default meta;
type Story = StoryObj<typeof LeftBlockHeading>;

// Base mock data
const baseMockData: Omit<LeftBlockHeadingProps, 'template'> = {
  fac: 1,
  bg: '#2563eb',
  font: '#1f2937',
  fontFamily: 'Inter, sans-serif',
  props: {
    height: 20,
    name: 'Professional Summary',
    top: 5
  }
};

// Template 1 Story - Simple line and heading
export const Template1: Story = {
  args: {
    ...baseMockData,
    template: 1
  }
};

// Template 2 Story - Icon after line and heading
export const Template2: Story = {
  args: {
    ...baseMockData,
    template: 2,
    props: {
      ...baseMockData.props,
      icon: FaUser
    }
  }
};

// Template 3 Story - Icon before line and heading
export const Template3: Story = {
  args: {
    ...baseMockData,
    template: 3,
    props: {
      ...baseMockData.props,
      icon: FaBriefcase
    }
  }
};

// Template 4 Story - Simple with different positioning
export const Template4: Story = {
  args: {
    ...baseMockData,
    template: 4
  }
};

// Template 5 Story - Unique width variant
export const Template5: Story = {
  args: {
    ...baseMockData,
    template: 5
  }
};

// Interactive Controls Story
export const Interactive: Story = {
  args: {
    ...baseMockData,
    template: 1
  }
};

// Template Showcase - Side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseData: Array<{
      template: 1 | 2 | 3 | 4 | 5;
      name: string;
      hasIcon: boolean;
      icon?: React.ComponentType<any>;
    }> = [
      { template: 1, name: 'Experience', hasIcon: false },
      { template: 2, name: 'Skills', hasIcon: true, icon: FaGraduationCap },
      { template: 3, name: 'Contact', hasIcon: true, icon: FaPhone },
      { template: 4, name: 'Education', hasIcon: false },
      { template: 5, name: 'Projects', hasIcon: false }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h3>All Template Variations</h3>
        {showcaseData.map((data, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ minWidth: '100px', fontSize: '12px' }}>Template {data.template}:</span>
            <LeftBlockHeading
              {...baseMockData}
              template={data.template}
              props={{
                ...baseMockData.props,
                name: data.name,
                ...(data.hasIcon && data.icon ? { icon: data.icon } : {})
              }}
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
    const scalingFactors = [0.7, 1.0, 1.3, 1.6];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
        <h3>Responsive Scaling (fac values)</h3>
        {scalingFactors.map((fac) => (
          <div key={fac} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ minWidth: '80px', fontSize: '12px' }}>fac: {fac}</span>
            <LeftBlockHeading
              {...baseMockData}
              fac={fac}
              template={2}
              props={{
                ...baseMockData.props,
                icon: FaUser
              }}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Accessibility Testing Story
export const AccessibilityTesting: Story = {
  render: () => {
    const accessibilityVariants: Array<{
      name: string;
      bg: string;
      font: string;
      fac?: number;
    }> = [
      { name: 'High Contrast', bg: '#000000', font: '#ffffff' },
      { name: 'Large Text', bg: '#2563eb', font: '#1f2937', fac: 1.5 },
      { name: 'Colorblind Safe', bg: '#0369a1', font: '#374151' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h3>Accessibility Variations</h3>
        {accessibilityVariants.map((variant, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ minWidth: '120px', fontSize: '12px' }}>{variant.name}:</span>
            <LeftBlockHeading
              {...baseMockData}
              bg={variant.bg}
              font={variant.font}
              fac={variant.fac || 1}
              template={2}
              props={{
                ...baseMockData.props,
                icon: FaEnvelope
              }}
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
    const edgeCases: Array<{
      name: string;
      height: number;
    }> = [
      { name: 'Very Long Heading Text That Might Overflow', height: 10 },
      { name: 'X', height: 50 },
      { name: '', height: 25 },
      { name: 'Special Chars !@#$%^&*()', height: 30 }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
        <h3>Edge Cases Testing</h3>
        {edgeCases.map((testCase, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ minWidth: '200px', fontSize: '11px', overflow: 'hidden' }}>
              "{testCase.name || '(empty)'}" (h:{testCase.height})
            </span>
            <LeftBlockHeading
              {...baseMockData}
              template={1}
              props={{
                ...baseMockData.props,
                name: testCase.name,
                height: testCase.height
              }}
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
    const validationCases: Array<{
      name: string;
      hasIcon: boolean;
      hasClassName: boolean;
      template: 1 | 2 | 3 | 4 | 5;
      icon?: React.ComponentType<any>;
    }> = [
      { 
        name: 'With all props', 
        hasIcon: true, 
        hasClassName: true, 
        template: 2,
        icon: FaBriefcase 
      },
      { 
        name: 'Minimal props', 
        hasIcon: false, 
        hasClassName: false, 
        template: 1 
      },
      { 
        name: 'Default fallback', 
        hasIcon: false, 
        hasClassName: false, 
        template: 4
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
        <h3>Props Validation</h3>
        {validationCases.map((testCase, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ minWidth: '120px', fontSize: '12px' }}>{testCase.name}:</span>
            <LeftBlockHeading
              fac={baseMockData.fac}
              bg={baseMockData.bg}
              font={baseMockData.font}
              fontFamily={testCase.hasClassName ? baseMockData.fontFamily : undefined}
              className={testCase.hasClassName ? 'test-class' : undefined}
              template={testCase.template}
              props={{
                ...baseMockData.props,
                ...(testCase.hasIcon && testCase.icon ? { icon: testCase.icon } : {})
              }}
            />
          </div>
        ))}
      </div>
    );
  }
};

// Template Comparison Story
export const TemplateComparison: Story = {
  render: () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
        <div>
          <h4>Template 1 - Basic</h4>
          <LeftBlockHeading {...baseMockData} template={1} />
          <p style={{ fontSize: '11px', marginTop: '5px' }}>Simple line + heading, 2px left offset</p>
        </div>
        
        <div>
          <h4>Template 2 - Icon After</h4>
          <LeftBlockHeading 
            {...baseMockData} 
            template={2}
            props={{ ...baseMockData.props, icon: FaUser }}
          />
          <p style={{ fontSize: '11px', marginTop: '5px' }}>Complex positioning, icon after content</p>
        </div>
        
        <div>
          <h4>Template 3 - Icon Before</h4>
          <LeftBlockHeading 
            {...baseMockData} 
            template={3}
            props={{ ...baseMockData.props, icon: FaBriefcase }}
          />
          <p style={{ fontSize: '11px', marginTop: '5px' }}>Icon first, fixed line height</p>
        </div>
        
        <div>
          <h4>Template 4 - Basic Alt</h4>
          <LeftBlockHeading {...baseMockData} template={4} />
          <p style={{ fontSize: '11px', marginTop: '5px' }}>Simple line + heading, 4px left offset</p>
        </div>
        
        <div>
          <h4>Template 5 - Narrow</h4>
          <LeftBlockHeading {...baseMockData} template={5} />
          <p style={{ fontSize: '11px', marginTop: '5px' }}>Unique 74px width, 6px left offset</p>
        </div>
      </div>
    );
  }
};
