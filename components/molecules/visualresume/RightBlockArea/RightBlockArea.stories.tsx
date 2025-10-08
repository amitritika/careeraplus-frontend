import type { Meta, StoryObj } from '@storybook/react';
import RightBlockArea, { RightBlockAreaProps } from './RightBlockArea';

const meta: Meta<typeof RightBlockArea> = {
  title: 'Components/RightBlockArea',
  component: RightBlockArea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A consolidated logo block component supporting multiple template variations with scalable dimensions and positioning.',
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
      description: 'Template variant (1-4: standard, 5: minimalist)',
    },
    bg: {
      control: { type: 'color' },
      description: 'Background/theme color',
    },
    font: {
      control: { type: 'color' },
      description: 'Font color',
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family (optional)',
    },
    id: {
      control: { type: 'text' },
      description: 'Element ID (optional)',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes (optional)',
    },
  },
  args: {
    fac: 1,
    template: 1,
    bg: '#3498db',
    font: '#2c3e50',
    props: {
      logo: 'fa fa-user',
      name: 'John Doe',
      left: 10,
      top: 10,
    },
  },
};

export default meta;
type Story = StoryObj<typeof RightBlockArea>;

// Sample logo data for consistent testing
const sampleLogoData = {
  logo: 'fa fa-user',
  name: 'John Doe',
  left: 10,
  top: 10,
};

const professionalLogoData = {
  logo: 'fa fa-briefcase',
  name: 'Manager',
  left: 15,
  top: 20,
};

const skillLogoData = {
  logo: 'fa fa-code',
  name: 'Developer',
  left: 5,
  top: 15,
};

/**
 * Default interactive story with controls
 */
export const Interactive: Story = {
  args: {
    fac: 1,
    template: 1,
    bg: '#3498db',
    font: '#2c3e50',
    props: sampleLogoData,
  },
};

/**
 * Standard template variations (Templates 1-4)
 */
export const Template1: Story = {
  args: {
    fac: 1,
    template: 1,
    bg: '#e74c3c',
    font: '#2c3e50',
    props: sampleLogoData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 1: Standard design with white icon on colored circle background.',
      },
    },
  },
};

export const Template2: Story = {
  args: {
    fac: 1,
    template: 2,
    bg: '#27ae60',
    font: '#2c3e50',
    props: professionalLogoData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 2: Identical to Template 1 - standard design pattern.',
      },
    },
  },
};

export const Template3: Story = {
  args: {
    fac: 1,
    template: 3,
    bg: '#f39c12',
    font: '#2c3e50',
    props: skillLogoData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 3: Identical to Template 1 - standard design pattern.',
      },
    },
  },
};

export const Template4: Story = {
  args: {
    fac: 1,
    template: 4,
    bg: '#9b59b6',
    font: '#2c3e50',
    props: {
      logo: 'fa fa-graduation-cap',
      name: 'Education',
      left: 12,
      top: 8,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 4: Identical to Template 1 - standard design pattern.',
      },
    },
  },
};

/**
 * Minimalist template variation (Template 5)
 */
export const Template5: Story = {
  args: {
    fac: 1,
    template: 5,
    bg: '#34495e',
    font: '#ecf0f1',
    props: {
      logo: 'fa fa-star',
      name: 'Featured',
      left: 8,
      top: 12,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 5: Minimalist design with no background circle, larger icon, and unified color scheme.',
      },
    },
  },
};

/**
 * Side-by-side template comparison
 */
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseTemplates = [
      { template: 1, bg: '#e74c3c', name: 'Standard' },
      { template: 5, bg: '#34495e', name: 'Minimalist' },
    ];
    
    return (
      <div style={{ display: 'flex', gap: '100px', padding: '20px' }}>
        {showcaseTemplates.map(({ template, bg, name }) => (
          <div key={template} style={{ position: 'relative', height: '80px', width: '150px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Template {template} ({name})</h4>
            <RightBlockArea
              fac={1}
              template={template as 1 | 2 | 3 | 4 | 5}
              bg={bg}
              font="#2c3e50"
              props={{
                logo: 'fa fa-user',
                name: 'Sample',
                left: 0,
                top: 0,
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
        story: 'Compare standard vs minimalist template designs side-by-side.',
      },
    },
  },
};

/**
 * Responsive scaling demonstration
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [
      { fac: 0.7, label: 'Small (0.7x)' },
      { fac: 1, label: 'Default (1x)' },
      { fac: 1.5, label: 'Large (1.5x)' },
    ];
    
    return (
      <div style={{ display: 'flex', gap: '150px', padding: '20px', alignItems: 'flex-start' }}>
        {scales.map(({ fac, label }) => (
          <div key={fac} style={{ position: 'relative', height: `${80 * fac}px`, width: `${120 * fac}px` }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{label}</h4>
            <RightBlockArea
              fac={fac}
              template={1}
              bg="#3498db"
              font="#2c3e50"
              props={{
                logo: 'fa fa-cog',
                name: 'Settings',
                left: 0,
                top: 0,
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
        story: 'Demonstrates responsive scaling with different fac values.',
      },
    },
  },
};

/**
 * Accessibility and high contrast testing
 */
export const AccessibilityTesting: Story = {
  render: () => {
    const accessibilityVariations = [
      {
        name: 'Standard',
        bg: '#3498db',
        font: '#2c3e50',
        fac: 1,
      },
      {
        name: 'High Contrast',
        bg: '#000000',
        font: '#ffffff',
        fac: 1,
      },
      {
        name: 'Large Text',
        bg: '#27ae60',
        font: '#2c3e50',
        fac: 1.3,
      },
    ];
    
    return (
      <div style={{ display: 'flex', gap: '120px', padding: '20px' }}>
        {accessibilityVariations.map(({ name, bg, font, fac }) => (
          <div key={name} style={{ position: 'relative', height: `${80 * fac}px`, width: `${150 * fac}px` }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{name}</h4>
            <RightBlockArea
              fac={fac}
              template={1}
              bg={bg}
              font={font}
              props={{
                logo: 'fa fa-universal-access',
                name: 'Access',
                left: 0,
                top: 0,
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
        story: 'Tests accessibility with high contrast and large text variations.',
      },
    },
  },
};

/**
 * Edge cases and extreme values testing
 */
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        name: 'Minimal Scale',
        fac: 0.3,
        props: { logo: 'fa fa-dot-circle', name: 'Min', left: 0, top: 0 },
      },
      {
        name: 'Long Text',
        fac: 1,
        props: { logo: 'fa fa-comment', name: 'Very Long Name Text', left: 0, top: 0 },
      },
      {
        name: 'Large Scale',
        fac: 2,
        props: { logo: 'fa fa-expand', name: 'Large', left: 0, top: 0 },
      },
    ];
    
    return (
      <div style={{ display: 'flex', gap: '180px', padding: '20px', alignItems: 'flex-start' }}>
        {edgeCases.map(({ name, fac, props }, index) => (
          <div key={index} style={{ position: 'relative', height: `${100 * Math.max(fac, 1)}px`, width: `${150 * Math.max(fac, 1)}px` }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>{name}</h4>
            <RightBlockArea
              fac={fac}
              template={1}
              bg="#e67e22"
              font="#2c3e50"
              props={props}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests edge cases with extreme scaling values and long text content.',
      },
    },
  },
};

/**
 * Props validation with defaults
 */
export const PropsValidation: Story = {
  render: () => {
    const validationCases = [
      {
        name: 'All Props',
        props: {
          fac: 1,
          template: 1 as const,
          bg: '#3498db',
          font: '#2c3e50',
          fontFamily: 'Arial, sans-serif',
          id: 'logo-block-1',
          className: 'custom-logo',
          props: sampleLogoData,
        },
      },
      {
        name: 'Required Only',
        props: {
          fac: 1,
          bg: '#e74c3c',
          font: '#ffffff',
          props: {
            logo: 'fa fa-heart',
            name: 'Required',
            left: 5,
            top: 5,
          },
        },
      },
      {
        name: 'With Defaults',
        props: {
          fac: 1.2,
          template: 5 as const,
          bg: '#27ae60',
          font: '#2c3e50',
          props: {
            logo: 'fa fa-check',
            name: 'Default',
            left: 8,
            top: 8,
          },
        },
      },
    ];
    
    return (
      <div style={{ display: 'flex', gap: '150px', padding: '20px' }}>
        {validationCases.map(({ name, props }, index) => (
          <div key={index} style={{ position: 'relative', height: '100px', width: '150px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{name}</h4>
            <RightBlockArea {...props} />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Validates component behavior with different prop combinations and optional properties.',
      },
    },
  },
};
