import type { Meta, StoryObj } from '@storybook/react';
import UserName, { type UserNameProps } from './UserName';

const meta: Meta<typeof UserName> = {
  title: 'Components/UserName',
  component: UserName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile UserName component supporting 5 distinct template variations with responsive scaling and adaptive font sizing.',
      },
    },
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for responsive sizing',
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variant selection',
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color in RGB format',
    },
    font: {
      control: { type: 'color' },
      description: 'Font color',
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family specification',
    },
    id: {
      control: { type: 'text' },
      description: 'Component identifier',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name',
    },
  },
} satisfies Meta<typeof UserName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Common props for reusability
const baseProps: Partial<UserNameProps> = {
  fac: 1,
  bg: 'rgb(52, 152, 219)',
  font: '#ffffff',
  fontFamily: 'calibri',
  props: {
    name: 'John Smith',
    height: 40,
    top: 20,
  },
};

/**
 * Template 1: Basic centered text layout
 */
export const Template1: Story = {
  args: {
    ...baseProps,
    template: 1,
  },
};

/**
 * Template 2: Split names with decorative line
 */
export const Template2: Story = {
  args: {
    ...baseProps,
    template: 2,
  },
};

/**
 * Template 3: Split names without line
 */
export const Template3: Story = {
  args: {
    ...baseProps,
    template: 3,
  },
};

/**
 * Template 4: Wide layout with background block
 */
export const Template4: Story = {
  args: {
    ...baseProps,
    template: 4,
    bg: 'rgb(155, 89, 182)',
  },
};

/**
 * Template 5: Background block with border
 */
export const Template5: Story = {
  args: {
    ...baseProps,
    template: 5,
    bg: 'rgb(230, 126, 34)',
  },
};

/**
 * Interactive controls for testing all template variations
 */
export const Interactive: Story = {
  args: {
    ...baseProps,
    template: 1,
  },
};

/**
 * Template showcase with side-by-side comparison
 */
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseData = {
      name: 'Jane Doe',
      height: 45,
      top: 30,
    };
    
    const templates = [
      { template: 1, bg: 'rgb(52, 152, 219)', title: 'Template 1: Basic' },
      { template: 2, bg: 'rgb(46, 204, 113)', title: 'Template 2: Split + Line' },
      { template: 3, bg: 'rgb(241, 196, 15)', title: 'Template 3: Split Only' },
      { template: 4, bg: 'rgb(155, 89, 182)', title: 'Template 4: Wide Layout' },
      { template: 5, bg: 'rgb(230, 126, 34)', title: 'Template 5: Border' },
    ];
    
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
        {templates.map(({ template, bg, title }) => (
          <div key={template} style={{ textAlign: 'center', margin: '10px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '12px' }}>{title}</h4>
            <div style={{ position: 'relative', width: '250px', height: '100px', border: '1px solid #ddd' }}>
              <UserName
                fac={1}
                bg={bg}
                font="#ffffff"
                fontFamily="calibri"
                template={template as 1 | 2 | 3 | 4 | 5}
                props={showcaseData}
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
        story: 'Side-by-side comparison of all template variations',
      },
    },
  },
};

/**
 * Responsive scaling demonstration
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scalingFactors = [0.7, 1, 1.3, 1.6];
    const userData = {
      name: 'Alex Johnson',
      height: 40,
      top: 20,
    };
    
    return (
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', padding: '20px' }}>
        {scalingFactors.map((fac) => (
          <div key={fac} style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '12px' }}>Scale: {fac}x</h4>
            <div style={{ position: 'relative', width: `${200 * fac}px`, height: `${100 * fac}px`, border: '1px solid #ddd' }}>
              <UserName
                fac={fac}
                bg="rgb(52, 152, 219)"
                font="#ffffff"
                fontFamily="calibri"
                template={2}
                props={userData}
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
        story: 'Demonstrates responsive scaling across different factor values',
      },
    },
  },
};

/**
 * Accessibility testing with high contrast and large text
 */
export const AccessibilityTesting: Story = {
  render: () => {
    const accessibilityVariations = [
      { 
        title: 'Standard', 
        props: { bg: 'rgb(52, 152, 219)', font: '#ffffff', fac: 1 } 
      },
      { 
        title: 'High Contrast', 
        props: { bg: 'rgb(0, 0, 0)', font: '#ffffff', fac: 1 } 
      },
      { 
        title: 'Large Text', 
        props: { bg: 'rgb(52, 152, 219)', font: '#ffffff', fac: 1.5 } 
      },
      { 
        title: 'High Contrast + Large', 
        props: { bg: 'rgb(0, 0, 0)', font: '#ffffff', fac: 1.5 } 
      },
    ];
    
    const userData = {
      name: 'Maria Garcia',
      height: 40,
      top: 20,
    };
    
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
        {accessibilityVariations.map(({ title, props: varProps }) => (
          <div key={title} style={{ textAlign: 'center', margin: '10px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '12px' }}>{title}</h4>
            <div style={{ position: 'relative', width: '200px', height: '100px', border: '1px solid #ddd' }}>
              <UserName
                {...varProps}
                fontFamily="calibri"
                template={1}
                props={userData}
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
        story: 'Accessibility testing with high contrast and large text variations',
      },
    },
  },
};

/**
 * Edge cases with extreme values and long names
 */
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        title: 'Very Long Name',
        data: { name: 'Christopher Alexander Montgomery', height: 40, top: 20 },
        fac: 1,
      },
      {
        title: 'Short Name',
        data: { name: 'Jo', height: 40, top: 20 },
        fac: 1,
      },
      {
        title: 'Single Character',
        data: { name: 'X', height: 40, top: 20 },
        fac: 1,
      },
      {
        title: 'Numbers & Symbols',
        data: { name: 'User123 #@!', height: 40, top: 20 },
        fac: 1,
      },
    ];
    
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
        {edgeCases.map(({ title, data, fac }) => (
          <div key={title} style={{ textAlign: 'center', margin: '10px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '12px' }}>{title}</h4>
            <div style={{ position: 'relative', width: '200px', height: '100px', border: '1px solid #ddd' }}>
              <UserName
                fac={fac}
                bg="rgb(52, 152, 219)"
                font="#ffffff"
                fontFamily="calibri"
                template={2}
                props={data}
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
        story: 'Edge cases with extreme values and various name lengths',
      },
    },
  },
};

/**
 * Props validation with defaults and missing optionals
 */
export const PropsValidation: Story = {
  render: () => {
    const validationCases = [
      {
        title: 'All Props',
        props: {
          fac: 1,
          bg: 'rgb(52, 152, 219)',
          font: '#ffffff',
          fontFamily: 'calibri',
          id: 'test-id',
          className: 'test-class',
          template: 1 as const,
          props: { name: 'Complete Props', height: 40, top: 20 },
        },
      },
      {
        title: 'Minimal Props',
        props: {
          fac: 1,
          bg: 'rgb(155, 89, 182)',
          font: '#ffffff',
          template: 3 as const,
          props: { name: 'Minimal Props', height: 40, top: 20 },
        },
      },
      {
        title: 'Default FontFamily',
        props: {
          fac: 1.2,
          bg: 'rgb(230, 126, 34)',
          font: '#ffffff',
          template: 5 as const,
          props: { name: 'Default Font', height: 35, top: 25 },
        },
      },
    ];
    
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
        {validationCases.map(({ title, props }) => (
          <div key={title} style={{ textAlign: 'center', margin: '10px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '12px' }}>{title}</h4>
            <div style={{ position: 'relative', width: '200px', height: '100px', border: '1px solid #ddd' }}>
              <UserName {...props} />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Props validation testing with various combinations of required and optional props',
      },
    },
  },
};
