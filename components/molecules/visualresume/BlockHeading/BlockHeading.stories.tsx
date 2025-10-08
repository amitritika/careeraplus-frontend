import type { Meta, StoryObj } from '@storybook/react';
import BlockHeading, { BlockHeadingProps, BlockHeadingData } from './BlockHeading';

/**
 * Mock text width calculation function for Storybook
 */
const mockTextWidth = (
  fontFamily: string,
  fontWeight: string,
  fontSize: string,
  fontStyle: string,
  text: string
): [number, number] => {
  const avgCharWidth = 4.2;
  const textWidth = text.length * avgCharWidth;
  return [0, textWidth];
};

/**
 * Sample block data for stories
 */
const sampleData: BlockHeadingData = {
  height: 12,
  name: 'Experience',
  top: 0,
};

const longTextData: BlockHeadingData = {
  height: 12,
  name: 'Professional Experience & Achievements',
  top: 0,
};

const shortTextData: BlockHeadingData = {
  height: 12,
  name: 'Skills',
  top: 0,
};

const meta: Meta<typeof BlockHeading> = {
  title: 'Components/BlockHeading',
  component: BlockHeading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A consolidated heading component supporting 5 template variations with dynamic sizing, positioning, and optional line elements.',
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
      description: 'Template variation number',
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
      description: 'Font family override',
    },
    id: {
      control: { type: 'text' },
      description: 'HTML id attribute',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name',
    },
  },
  args: {
    fac: 1,
    template: '1',
    bg: '#2563eb',
    font: '#1f2937',
    fontFamily: 'calibri',
    textWidthFn: mockTextWidth,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Template 1 - Center-aligned heading without line
 */
export const Template1: Story = {
  args: {
    template: '1',
    props: sampleData,
    fac: 1,
    bg: '#2563eb',
  },
};

/**
 * Template 2 - Left-aligned heading with horizontal line
 */
export const Template2: Story = {
  args: {
    template: '2',
    props: sampleData,
    fac: 1,
    bg: '#dc2626',
  },
};

/**
 * Template 3 - Left-aligned heading using font color
 */
export const Template3: Story = {
  args: {
    template: '3',
    props: sampleData,
    fac: 1,
    font: '#059669',
  },
};

/**
 * Template 4 - Wide left-aligned heading
 */
export const Template4: Story = {
  args: {
    template: '4',
    props: sampleData,
    fac: 1,
    bg: '#7c3aed',
  },
};

/**
 * Template 5 - Medium-wide left-aligned heading
 */
export const Template5: Story = {
  args: {
    template: '5',
    props: sampleData,
    fac: 1,
    bg: '#ea580c',
  },
};

/**
 * Interactive Controls - Test all top-level props
 */
export const InteractiveControls: Story = {
  args: {
    template: '2',
    props: sampleData,
    fac: 1.2,
    bg: '#3b82f6',
    font: '#1e40af',
  },
};

/**
 * Template Showcase - Side-by-side comparison of all templates
 */
export const TemplateShowcase: Story = {
  render: () => {
    const templates: Array<{ template: '1' | '2' | '3' | '4' | '5'; color: string; name: string }> = [
      { template: '1', color: '#2563eb', name: 'Center Aligned' },
      { template: '2', color: '#dc2626', name: 'With Line' },
      { template: '3', color: '#059669', name: 'Font Color' },
      { template: '4', color: '#7c3aed', name: 'Wide Layout' },
      { template: '5', color: '#ea580c', name: 'Medium Wide' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        <h3>All Template Variations</h3>
        {templates.map((t, index) => (
          <div key={t.template} style={{ position: 'relative', height: '20px', border: '1px solid #e5e7eb', padding: '10px' }}>
            <div style={{ marginBottom: '5px', fontSize: '12px', color: '#6b7280' }}>
              Template {t.template} - {t.name}
            </div>
            <BlockHeading
              template={t.template}
              props={{ ...sampleData, top: 0 }}
              fac={1}
              bg={t.color}
              font={t.color}
              textWidthFn={mockTextWidth}
            />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Responsive Scaling - Different fac values demonstration
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.8, 1.0, 1.5, 2.0];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        <h3>Responsive Scaling (Template 2)</h3>
        {scales.map((scale) => (
          <div key={scale} style={{ position: 'relative', height: `${scale * 20}px`, border: '1px solid #e5e7eb', padding: '10px' }}>
            <div style={{ marginBottom: '5px', fontSize: '12px', color: '#6b7280' }}>
              Scale: {scale}x
            </div>
            <BlockHeading
              template="2"
              props={{ ...sampleData, top: 0 }}
              fac={scale}
              bg="#3b82f6"
              textWidthFn={mockTextWidth}
            />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Text Length Variations - Test dynamic width calculation
 */
export const TextLengthVariations: Story = {
  render: () => {
    const textVariations = [
      shortTextData,
      sampleData,
      longTextData,
      { ...sampleData, name: 'A' },
      { ...sampleData, name: 'Very Long Professional Experience Section Header' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        <h3>Text Length Variations (Template 2 - Dynamic Width)</h3>
        {textVariations.map((data, index) => (
          <div key={index} style={{ position: 'relative', height: '20px', border: '1px solid #e5e7eb', padding: '10px' }}>
            <div style={{ marginBottom: '5px', fontSize: '12px', color: '#6b7280' }}>
              Text: "{data.name}"
            </div>
            <BlockHeading
              template="2"
              props={{ ...data, top: 0 }}
              fac={1}
              bg="#dc2626"
              textWidthFn={mockTextWidth}
            />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Accessibility Testing - High contrast and large text
 */
export const AccessibilityTesting: Story = {
  render: () => {
    const accessibilityTests = [
      { name: 'High Contrast', bg: '#000000', font: '#ffffff', fac: 1 },
      { name: 'Large Text', bg: '#2563eb', font: '#1f2937', fac: 1.8 },
      { name: 'Color Blind Safe', bg: '#0f766e', font: '#134e4a', fac: 1 },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        <h3>Accessibility Testing</h3>
        {accessibilityTests.map((test) => (
          <div key={test.name} style={{ position: 'relative', height: `${test.fac * 20}px`, border: '1px solid #e5e7eb', padding: '10px' }}>
            <div style={{ marginBottom: '5px', fontSize: '12px', color: '#6b7280' }}>
              {test.name}
            </div>
            <BlockHeading
              template="1"
              props={{ ...sampleData, top: 0 }}
              fac={test.fac}
              bg={test.bg}
              font={test.font}
              textWidthFn={mockTextWidth}
            />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Edge Cases - Extreme values and missing data
 */
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      { name: 'Empty Text', props: { ...sampleData, name: '' } },
      { name: 'Very Small Scale', props: sampleData, fac: 0.3 },
      { name: 'Very Large Scale', props: sampleData, fac: 3 },
      { name: 'Zero Height', props: { ...sampleData, height: 0 } },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        <h3>Edge Cases Testing</h3>
        {edgeCases.map((testCase, index) => (
          <div key={index} style={{ position: 'relative', height: `${(testCase.fac || 1) * 20}px`, border: '1px solid #e5e7eb', padding: '10px', minHeight: '40px' }}>
            <div style={{ marginBottom: '5px', fontSize: '12px', color: '#6b7280' }}>
              {testCase.name}
            </div>
            <BlockHeading
              template="2"
              props={{ ...testCase.props, top: 0 }}
              fac={testCase.fac || 1}
              bg="#3b82f6"
              textWidthFn={mockTextWidth}
            />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Props Validation - Default values and missing optionals
 */
export const PropsValidation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
      <h3>Props Validation - Minimal Required Props</h3>
      <div style={{ position: 'relative', height: '20px', border: '1px solid #e5e7eb', padding: '10px' }}>
        <div style={{ marginBottom: '5px', fontSize: '12px', color: '#6b7280' }}>
          Only required props provided
        </div>
        <BlockHeading
          fac={1}
          props={sampleData}
        />
      </div>
    </div>
  ),
};
