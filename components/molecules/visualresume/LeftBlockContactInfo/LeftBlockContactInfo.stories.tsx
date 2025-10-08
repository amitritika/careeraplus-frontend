import type { Meta, StoryObj } from '@storybook/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaUser } from 'react-icons/fa';
import LeftBlockContactInfo from './LeftBlockContactInfo';
import type { LeftBlockContactInfoProps, TemplateType } from './LeftBlockContactInfo';

const meta = {
  title: 'Components/LeftBlockContactInfo',
  component: LeftBlockContactInfo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# LeftBlockContactInfo Component

A versatile contact information display component with 5 distinct template variations.
Each template offers different styling approaches, from simple icon+text layouts to
complex background treatments with borders and circular backgrounds.

## Templates Overview:
- **Template 1**: Fixed height, wide text, minimal styling
- **Template 2**: Dynamic height, container with border styling  
- **Template 3**: Dynamic height, circular icon background
- **Template 4**: Dynamic height, clean minimal layout
- **Template 5**: Dynamic height, wide text with background color theming

## Key Features:
- TypeScript support with full type safety
- Scalable dimensions via fac prop
- React Icons integration
- Memoized calculations for performance
- Configurable colors and fonts
        `,
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
      options: ['1', '2', '3', '4', '5'],
      description: 'Template variant to use',
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
      description: 'Font family',
    },
    id: {
      control: { type: 'text' },
      description: 'Component ID',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name',
    },
  },
} satisfies Meta<LeftBlockContactInfoProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample contact data for stories
const sampleContactData = {
  phone: { name: '+1 (555) 123-4567', icon: FaPhone, top: 0, height: 6 },
  email: { name: 'john.doe@email.com', icon: FaEnvelope, top: 0, height: 6 },
  address: { name: '123 Main St, City', icon: FaMapMarkerAlt, top: 0, height: 6 },
  linkedin: { name: 'linkedin.com/in/johndoe', icon: FaLinkedin, top: 0, height: 6 },
  name: { name: 'John Doe', icon: FaUser, top: 0, height: 6 },
};

// Individual Template Stories
export const Template1: Story = {
  args: {
    fac: 1.5,
    template: '1',
    bg: '#2563eb',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.phone,
  },
};

export const Template2: Story = {
  args: {
    fac: 1.5,
    template: '2',
    bg: '#dc2626',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.email,
  },
};

export const Template3: Story = {
  args: {
    fac: 1.5,
    template: '3',
    bg: '#16a34a',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.address,
  },
};

export const Template4: Story = {
  args: {
    fac: 1.5,
    template: '4',
    bg: '#7c3aed',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.linkedin,
  },
};

export const Template5: Story = {
  args: {
    fac: 1.5,
    template: '5',
    bg: '#ea580c',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.name,
  },
};

// Interactive Controls Story
export const InteractiveControls: Story = {
  args: {
    fac: 1.5,
    template: '3',
    bg: '#2563eb',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.phone,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls below to experiment with different prop combinations and see how they affect the component rendering.',
      },
    },
  },
};

// Template Comparison Showcase - Properly typed with args
export const TemplateShowcase: Story = {
  args: {
    fac: 1.5,
    template: '1',
    bg: '#2563eb',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.phone,
  },
  render: () => {
    const templates: TemplateType[] = ['1', '2', '3', '4', '5'];
    const colors = ['#2563eb', '#dc2626', '#16a34a', '#7c3aed', '#ea580c'];
    const contacts = [
      sampleContactData.phone,
      sampleContactData.email,
      sampleContactData.address,
      sampleContactData.linkedin,
      sampleContactData.name,
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h3>All Template Variations</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
          {templates.map((template, index) => (
            <div key={template} style={{ position: 'relative', minHeight: '60px', minWidth: '200px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Template {template}</h4>
              <LeftBlockContactInfo
                fac={1.5}
                template={template}
                bg={colors[index]}
                font="#ffffff"
                fontFamily="Calibri"
                props={contacts[index]}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Side-by-side comparison of all template variations with different contact types and colors.',
      },
    },
  },
};

// Responsive Scaling Story - Properly typed with args
export const ResponsiveScaling: Story = {
  args: {
    fac: 1.5,
    template: '3',
    bg: '#2563eb',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.phone,
  },
  render: () => {
    const scales = [0.8, 1.0, 1.5, 2.0];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        <h3>Responsive Scaling (fac values)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'flex-start' }}>
          {scales.map(scale => (
            <div key={scale} style={{ position: 'relative', minHeight: '80px', minWidth: '150px' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>fac: {scale}</h4>
              <LeftBlockContactInfo
                fac={scale}
                template="3"
                bg="#2563eb"
                font="#ffffff"
                fontFamily="Calibri"
                props={sampleContactData.phone}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Demonstrates how the component scales proportionally across different fac values.',
      },
    },
  },
};

// Accessibility Testing Story - Properly typed with args
export const AccessibilityTesting: Story = {
  args: {
    fac: 1.5,
    template: '3',
    bg: '#2563eb',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.email,
  },
  render: () => {
    const accessibilityVariations = [
      { name: 'Standard', bg: '#2563eb', font: '#ffffff', fontFamily: 'Calibri' },
      { name: 'High Contrast', bg: '#000000', font: '#ffffff', fontFamily: 'Calibri' },
      { name: 'Large Text', bg: '#2563eb', font: '#ffffff', fontFamily: 'Arial', fac: 2.5 },
      { name: 'Alternative Font', bg: '#2563eb', font: '#ffffff', fontFamily: 'Verdana' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        <h3>Accessibility Variations</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
          {accessibilityVariations.map(variation => (
            <div key={variation.name} style={{ position: 'relative', minHeight: '80px', minWidth: '200px' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>{variation.name}</h4>
              <LeftBlockContactInfo
                fac={variation.fac || 1.5}
                template="3"
                bg={variation.bg}
                font={variation.font}
                fontFamily={variation.fontFamily}
                props={sampleContactData.email}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Testing component accessibility with high contrast colors, large text, and alternative fonts.',
      },
    },
  },
};

// Edge Cases Story - Properly typed with args
export const EdgeCases: Story = {
  args: {
    fac: 1.5,
    template: '4',
    bg: '#2563eb',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.email,
  },
  render: () => {
    const edgeCaseData = [
      { name: 'Very Long Email Address', data: { ...sampleContactData.email, name: 'very.long.email.address.that.might.overflow@company.com' } },
      { name: 'Short Text', data: { ...sampleContactData.phone, name: 'Call' } },
      { name: 'Numbers Only', data: { ...sampleContactData.phone, name: '1234567890' } },
      { name: 'Special Characters', data: { ...sampleContactData.address, name: '123 Main St. #456, Suite A-B' } },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        <h3>Edge Cases Testing</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {edgeCaseData.map(testCase => (
            <div key={testCase.name}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>{testCase.name}</h4>
              <div style={{ position: 'relative', minHeight: '60px', minWidth: '300px' }}>
                <LeftBlockContactInfo
                  fac={1.5}
                  template="4"
                  bg="#2563eb"
                  font="#ffffff"
                  fontFamily="Calibri"
                  props={testCase.data}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Testing component behavior with edge cases like very long text, short text, and special characters.',
      },
    },
  },
};

// Props Validation Story - Properly typed with args
export const PropsValidation: Story = {
  args: {
    fac: 1.5,
    template: '1',
    bg: '#2563eb',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.phone,
  },
  render: () => {
    const validationTests = [
      { 
        name: 'Minimum fac', 
        props: { fac: 0.5, template: '1' as TemplateType, props: sampleContactData.phone } 
      },
      { 
        name: 'Maximum fac', 
        props: { fac: 3.0, template: '2' as TemplateType, props: sampleContactData.email } 
      },
      { 
        name: 'No optional props', 
        props: { fac: 1.5, template: '3' as TemplateType, props: sampleContactData.address } 
      },
      { 
        name: 'All props provided', 
        props: { 
          fac: 1.5, 
          template: '4' as TemplateType, 
          bg: '#ff0000', 
          font: '#00ff00', 
          fontFamily: 'Times New Roman',
          id: 'test-component',
          className: 'test-class',
          props: sampleContactData.linkedin 
        } 
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        <h3>Props Validation Tests</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
          {validationTests.map(test => (
            <div key={test.name} style={{ position: 'relative', minHeight: '80px', minWidth: '200px' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>{test.name}</h4>
              <LeftBlockContactInfo {...test.props} />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Testing component behavior with different prop combinations including minimum/maximum values and missing optional props.',
      },
    },
  },
};

// Color Theme Variations - Additional story for better testing coverage
export const ColorThemeVariations: Story = {
  args: {
    fac: 1.5,
    template: '3',
    bg: '#2563eb',
    font: '#ffffff',
    fontFamily: 'Calibri',
    props: sampleContactData.phone,
  },
  render: () => {
    const colorThemes = [
      { name: 'Blue Theme', bg: '#2563eb', font: '#ffffff' },
      { name: 'Red Theme', bg: '#dc2626', font: '#ffffff' },
      { name: 'Green Theme', bg: '#16a34a', font: '#ffffff' },
      { name: 'Purple Theme', bg: '#7c3aed', font: '#ffffff' },
      { name: 'Orange Theme', bg: '#ea580c', font: '#ffffff' },
      { name: 'Dark Theme', bg: '#1f2937', font: '#f9fafb' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        <h3>Color Theme Variations</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
          {colorThemes.map(theme => (
            <div key={theme.name} style={{ position: 'relative', minHeight: '80px', minWidth: '200px' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>{theme.name}</h4>
              <LeftBlockContactInfo
                fac={1.5}
                template="3"
                bg={theme.bg}
                font={theme.font}
                fontFamily="Calibri"
                props={sampleContactData.email}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Demonstrating component appearance with various color themes and combinations.',
      },
    },
  },
};
