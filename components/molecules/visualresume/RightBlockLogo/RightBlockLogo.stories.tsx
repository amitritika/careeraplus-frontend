import type { Meta, StoryObj } from '@storybook/react';
import { FaUser, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import RightBlockLogo from './RightBlockLogo';

const meta: Meta<typeof RightBlockLogo> = {
  title: 'Components/RightBlockLogo',
  component: RightBlockLogo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# RightBlockLogo Component

A consolidated template-based logo component supporting 5 different visual variations.

## Template Variations:
- **Template 1**: Large circular background with white icon
- **Template 2**: Diamond border with colored icon  
- **Template 3**: Small circular background with white icon
- **Template 4**: No background with font-colored icon
- **Template 5**: Hidden/empty template

## Key Features:
- TypeScript with complete type safety
- Performance optimized with useMemo
- Template-based configuration system
- React Icons integration
- Responsive scaling with fac multiplier
- Pixel-perfect visual parity with originals
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
      options: [1, 2, 3, 4, 5],
      description: 'Template variation (1-5)',
    },
    bg: {
      control: { type: 'color' },
      description: 'Background/accent color',
    },
    font: {
      control: { type: 'color' },
      description: 'Font/text color',
    },
    id: {
      control: { type: 'text' },
      description: 'Component identifier',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name',
    },
  },
  args: {
    fac: 1,
    template: 1,
    bg: '#3b82f6',
    font: '#1f2937',
    props: {
      name: FaUser,
      top: 10,
    },
    id: 'logo-demo',
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof RightBlockLogo>;

/**
 * Default interactive story with all controls
 */
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground with all available controls. Adjust the scaling factor, template, colors, and icon properties.',
      },
    },
  },
};

/**
 * Template 1 - Large circular background with white icon
 */
export const Template1: Story = {
  args: {
    template: 1,
    fac: 1.2,
    bg: '#ef4444',
    font: '#374151',
    props: {
      name: FaBriefcase,
      top: 5,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 1 features a large circular background (13x13 fac units) with white icon. Perfect for prominent logo displays.',
      },
    },
  },
};

/**
 * Template 2 - Diamond border with colored icon
 */
export const Template2: Story = {
  args: {
    template: 2,
    fac: 1.2,
    bg: '#10b981',
    font: '#374151',
    props: {
      name: FaGraduationCap,
      top: 8,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 2 uses a diamond-shaped border with the icon colored using the background color. Unique positioning offset.',
      },
    },
  },
};

/**
 * Template 3 - Small circular background with white icon
 */
export const Template3: Story = {
  args: {
    template: 3,
    fac: 1.2,
    bg: '#8b5cf6',
    font: '#374151',
    props: {
      name: FaPhone,
      top: 12,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 3 provides a smaller circular background (9x9 fac units) with white icon and custom positioning logic.',
      },
    },
  },
};

/**
 * Template 4 - No background with font-colored icon
 */
export const Template4: Story = {
  args: {
    template: 4,
    fac: 1.2,
    bg: '#f59e0b',
    font: '#dc2626',
    props: {
      name: FaEnvelope,
      top: 6,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 4 renders only the icon using the font color, without any background or border elements.',
      },
    },
  },
};

/**
 * Template 5 - Hidden/empty template
 */
export const Template5: Story = {
  args: {
    template: 5,
    fac: 1.2,
    bg: '#6366f1',
    font: '#374151',
    props: {
      name: FaMapMarkerAlt,
      top: 0,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 5 renders an empty/hidden component with zero dimensions. Useful for conditional visibility.',
      },
    },
  },
};

/**
 * Template Showcase - Side-by-side comparison of all templates
 */
export const TemplateShowcase: Story = {
  render: () => {
    const templates = [
      { template: 1, bg: '#ef4444', icon: FaBriefcase, name: 'Template 1' },
      { template: 2, bg: '#10b981', icon: FaGraduationCap, name: 'Template 2' },
      { template: 3, bg: '#8b5cf6', icon: FaPhone, name: 'Template 3' },
      { template: 4, bg: '#f59e0b', icon: FaEnvelope, name: 'Template 4' },
      { template: 5, bg: '#6366f1', icon: FaMapMarkerAlt, name: 'Template 5' },
    ];

    return (
      <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap', padding: '40px' }}>
        {templates.map(({ template, bg, icon, name }) => (
          <div key={template} style={{ position: 'relative', minHeight: '60px', minWidth: '60px' }}>
            <RightBlockLogo
              template={template as 1 | 2 | 3 | 4 | 5}
              fac={1.5}
              bg={bg}
              font="#374151"
              props={{ name: icon, top: 0 }}
              id={`template-${template}`}
            />
            <div style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all 5 template variations with different icons and colors.',
      },
    },
  },
};

/**
 * Responsive Scaling - Different fac values
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.8, 1.0, 1.3, 1.8, 2.2];
    
    return (
      <div style={{ display: 'flex', gap: '60px', alignItems: 'center', padding: '40px' }}>
        {scales.map((fac) => (
          <div key={fac} style={{ position: 'relative', minHeight: '80px', textAlign: 'center' }}>
            <RightBlockLogo
              template={1}
              fac={fac}
              bg="#3b82f6"
              font="#374151"
              props={{ name: FaLinkedin, top: 0 }}
              id={`scale-${fac}`}
            />
            <div style={{ marginTop: '60px', fontSize: '11px', color: '#6b7280' }}>
              fac: {fac}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates responsive scaling across different fac values (0.8x to 2.2x).',
      },
    },
  },
};

/**
 * Icon Variety - Different React Icons
 */
export const IconVariety: Story = {
  render: () => {
    const icons = [
      { icon: FaUser, label: 'Profile' },
      { icon: FaBriefcase, label: 'Work' },
      { icon: FaGraduationCap, label: 'Education' },
      { icon: FaPhone, label: 'Contact' },
      { icon: FaEnvelope, label: 'Email' },
      { icon: FaLinkedin, label: 'LinkedIn' },
      { icon: FaGithub, label: 'GitHub' },
      { icon: FaMapMarkerAlt, label: 'Location' },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', padding: '20px' }}>
        {icons.map(({ icon, label }) => (
          <div key={label} style={{ position: 'relative', textAlign: 'center', minHeight: '60px' }}>
            <RightBlockLogo
              template={3}
              fac={1.2}
              bg="#6366f1"
              font="#374151"
              props={{ name: icon, top: 0 }}
              id={`icon-${label}`}
            />
            <div style={{ marginTop: '45px', fontSize: '11px', color: '#6b7280' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different React Icons rendered with Template 3 styling.',
      },
    },
  },
};

/**
 * Color Variations - Different color schemes
 */
export const ColorVariations: Story = {
  render: () => {
    const colorSchemes = [
      { bg: '#ef4444', font: '#7f1d1d', name: 'Red Theme' },
      { bg: '#10b981', font: '#065f46', name: 'Green Theme' },
      { bg: '#3b82f6', font: '#1e3a8a', name: 'Blue Theme' },
      { bg: '#8b5cf6', font: '#581c87', name: 'Purple Theme' },
      { bg: '#f59e0b', font: '#92400e', name: 'Amber Theme' },
      { bg: '#06b6d4', font: '#164e63', name: 'Cyan Theme' },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px', padding: '40px' }}>
        {colorSchemes.map(({ bg, font, name }) => (
          <div key={name} style={{ position: 'relative', textAlign: 'center', minHeight: '60px' }}>
            <RightBlockLogo
              template={1}
              fac={1.3}
              bg={bg}
              font={font}
              props={{ name: FaUser, top: 0 }}
              id={`color-${name.replace(' ', '-').toLowerCase()}`}
            />
            <div style={{ marginTop: '55px', fontSize: '12px', color: '#6b7280' }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different color schemes applied to Template 1, showing background and font color variations.',
      },
    },
  },
};

/**
 * Accessibility Testing - High contrast and large text
 */
export const AccessibilityTesting: Story = {
  render: () => {
    const accessibilityVariations = [
      { 
        name: 'High Contrast',
        template: 1,
        fac: 1.5,
        bg: '#000000',
        font: '#ffffff',
      },
      { 
        name: 'Large Scale',
        template: 2,
        fac: 2.5,
        bg: '#1f2937',
        font: '#f9fafb',
      },
      { 
        name: 'Color Blind Safe',
        template: 3,
        fac: 1.8,
        bg: '#0f766e',
        font: '#fef7ff',
      },
    ];

    return (
      <div style={{ display: 'flex', gap: '100px', padding: '50px' }}>
        {accessibilityVariations.map(({ name, template, fac, bg, font }) => (
          <div key={name} style={{ position: 'relative', textAlign: 'center', minHeight: '100px' }}>
            <RightBlockLogo
              template={template as 1 | 2 | 3}
              fac={fac}
              bg={bg}
              font={font}
              props={{ name: FaUser, top: 0 }}
              id={`a11y-${name.replace(' ', '-').toLowerCase()}`}
            />
            <div style={{ marginTop: '80px', fontSize: '13px', color: '#374151', fontWeight: 'bold' }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility-focused variations with high contrast, large scales, and color-blind safe palettes.',
      },
    },
  },
};

/**
 * Edge Cases - Extreme values and edge scenarios
 */
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      { name: 'Minimum Scale', fac: 0.3, template: 1 },
      { name: 'Maximum Scale', fac: 3.0, template: 2 },
      { name: 'Zero Top Position', props: { name: FaUser, top: 0 }, template: 3 },
      { name: 'Large Top Offset', props: { name: FaUser, top: 50 }, template: 4 },
    ];

    return (
      <div style={{ display: 'flex', gap: '120px', padding: '60px' }}>
        {edgeCases.map(({ name, fac = 1.2, props = { name: FaUser, top: 10 }, template }) => (
          <div key={name} style={{ position: 'relative', textAlign: 'center', minHeight: '120px' }}>
            <RightBlockLogo
              template={template as 1 | 2 | 3 | 4}
              fac={fac}
              bg="#6366f1"
              font="#1f2937"
              props={props}
              id={`edge-${name.replace(' ', '-').toLowerCase()}`}
            />
            <div style={{ marginTop: '100px', fontSize: '11px', color: '#6b7280', maxWidth: '80px' }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case testing with extreme scaling values and positioning scenarios.',
      },
    },
  },
};

/**
 * Props Validation - Default values and missing optionals
 */
export const PropsValidation: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '80px', padding: '40px' }}>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <RightBlockLogo
            fac={1.5}
            bg="#3b82f6"
            font="#1f2937"
            props={{ name: FaUser, top: 10 }}
            // No template prop - should default to 1
            // No id prop - should work without
            // No className prop - should work without
          />
          <div style={{ marginTop: '60px', fontSize: '12px', color: '#6b7280' }}>
            Missing Optionals
          </div>
        </div>
        
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <RightBlockLogo
            fac={1.5}
            bg="#10b981"
            font="#374151"
            props={{ name: FaPhone, top: 8 }}
            template={2}
            id="custom-id"
            className="custom-class"
          />
          <div style={{ marginTop: '60px', fontSize: '12px', color: '#6b7280' }}>
            All Props Provided
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Validation of component behavior with missing optional props versus fully specified props.',
      },
    },
  },
};
