import type { Meta, StoryObj } from '@storybook/react';
import RightBlockComp, { RightBlockTemplate, RightBlockCompProps } from './RightBlockComp';

/**
 * Mock data for testing different scenarios
 */
const mockProps = {
  name: 'Sample Block Text',
  width: 120,
  left: 50,
  top: 30
};

const longTextProps = {
  name: 'This is a much longer text content that tests how the component handles extended content',
  width: 200,
  left: 20,
  top: 50
};

const shortProps = {
  name: 'Hi',
  width: 60,
  left: 10,
  top: 15
};

const meta: Meta<typeof RightBlockComp> = {
  title: 'Components/RightBlockComp',
  component: RightBlockComp,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A scalable, positioned block component with 5 different template variations supporting various border styles and configurations.'
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
      options: Object.values(RightBlockTemplate),
      description: 'Template variation with different border styles'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color'
    },
    font: {
      control: { type: 'color' },
      description: 'Text and border color'
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
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RightBlockComp>;

/**
 * Default interactive story with controls
 */
export const Default: Story = {
  args: {
    fac: 1,
    props: mockProps,
    bg: '#f0f0f0',
    font: '#333333',
    fontFamily: 'Arial, sans-serif',
    template: RightBlockTemplate.TEMPLATE_1,
    id: 'right-block-default'
  }
};

/**
 * Individual template variations
 */
export const Template1: Story = {
  args: {
    fac: 1.2,
    props: mockProps,
    bg: '#e3f2fd',
    font: '#1565c0',
    fontFamily: 'Roboto, sans-serif',
    template: RightBlockTemplate.TEMPLATE_1,
    id: 'template1-demo'
  }
};

export const Template2: Story = {
  args: {
    fac: 1.2,
    props: mockProps,
    bg: '#f3e5f5',
    font: '#7b1fa2',
    fontFamily: 'Roboto, sans-serif',
    template: RightBlockTemplate.TEMPLATE_2,
    id: 'template2-demo'
  }
};

export const Template3: Story = {
  args: {
    fac: 1.2,
    props: mockProps,
    bg: '#e8f5e8',
    font: '#2e7d32',
    fontFamily: 'Roboto, sans-serif',
    template: RightBlockTemplate.TEMPLATE_3,
    id: 'template3-demo'
  }
};

export const Template4: Story = {
  args: {
    fac: 1.2,
    props: mockProps,
    bg: '#fff3e0',
    font: '#ef6c00',
    fontFamily: 'Roboto, sans-serif',
    template: RightBlockTemplate.TEMPLATE_4,
    id: 'template4-demo'
  }
};

export const Template5: Story = {
  args: {
    fac: 1.2,
    props: mockProps,
    bg: '#fce4ec',
    font: '#c2185b',
    fontFamily: 'Roboto, sans-serif',
    template: RightBlockTemplate.TEMPLATE_5,
    id: 'template5-demo'
  }
};

/**
 * Template comparison showcase
 */
export const TemplateComparison: Story = {
  render: () => {
    const templates = [
      { template: RightBlockTemplate.TEMPLATE_1, bg: '#e3f2fd', font: '#1565c0', name: 'Template 1 - Full Border' },
      { template: RightBlockTemplate.TEMPLATE_2, bg: '#f3e5f5', font: '#7b1fa2', name: 'Template 2 - Right Border' },
      { template: RightBlockTemplate.TEMPLATE_3, bg: '#e8f5e8', font: '#2e7d32', name: 'Template 3 - Full Border' },
      { template: RightBlockTemplate.TEMPLATE_4, bg: '#fff3e0', font: '#ef6c00', name: 'Template 4 - No Border' },
      { template: RightBlockTemplate.TEMPLATE_5, bg: '#fce4ec', font: '#c2185b', name: 'Template 5 - No Border' }
    ];

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {templates.map((config, index) => (
          <div key={config.template} style={{ position: 'relative', minHeight: '100px', minWidth: '200px', border: '1px dashed #ccc' }}>
            <RightBlockComp
              fac={1}
              props={{ ...mockProps, name: config.name }}
              bg={config.bg}
              font={config.font}
              fontFamily="Roboto, sans-serif"
              template={config.template}
              id={`comparison-${index}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Responsive scaling demonstration
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.8, 1, 1.5, 2];
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', padding: '20px' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ position: 'relative', minHeight: `${scale * 50}px`, minWidth: `${scale * 150}px`, border: '1px dashed #ccc' }}>
            <h4 style={{ margin: 0, fontSize: '12px', color: '#666' }}>Scale: {scale}x</h4>
            <RightBlockComp
              fac={scale}
              props={mockProps}
              bg="#f5f5f5"
              font="#333"
              fontFamily="Arial, sans-serif"
              template={RightBlockTemplate.TEMPLATE_1}
              id={`scale-${scale}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Content variation testing
 */
export const ContentVariations: Story = {
  render: () => {
    const variations = [
      { props: shortProps, label: 'Short Text' },
      { props: mockProps, label: 'Normal Text' },
      { props: longTextProps, label: 'Long Text' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        {variations.map((variation, index) => (
          <div key={index} style={{ position: 'relative', minHeight: '80px', border: '1px dashed #ccc', padding: '10px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>{variation.label}</h4>
            <RightBlockComp
              fac={1.2}
              props={variation.props}
              bg="#f0f8ff"
              font="#2c3e50"
              fontFamily="Georgia, serif"
              template={RightBlockTemplate.TEMPLATE_2}
              id={`content-${index}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Accessibility and high contrast testing
 */
export const AccessibilityTesting: Story = {
  render: () => {
    const accessibilityConfigs = [
      { bg: '#ffffff', font: '#000000', label: 'High Contrast - Black on White' },
      { bg: '#000000', font: '#ffffff', label: 'High Contrast - White on Black' },
      { bg: '#ffff00', font: '#000000', label: 'High Visibility - Black on Yellow' },
      { bg: '#0000ff', font: '#ffffff', label: 'High Contrast - White on Blue' }
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', padding: '20px' }}>
        {accessibilityConfigs.map((config, index) => (
          <div key={index} style={{ position: 'relative', minHeight: '100px', border: '2px solid #ccc', padding: '10px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>{config.label}</h4>
            <RightBlockComp
              fac={1.5}
              props={{ ...mockProps, name: 'Accessibility Test' }}
              bg={config.bg}
              font={config.font}
              fontFamily="Arial, sans-serif"
              template={RightBlockTemplate.TEMPLATE_1}
              id={`a11y-${index}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Edge cases and extreme values
 */
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      { fac: 0.5, props: { name: 'Tiny', width: 40, left: 5, top: 5 }, label: 'Minimum Scale' },
      { fac: 2.5, props: { name: 'Large', width: 100, left: 20, top: 20 }, label: 'Maximum Scale' },
      { fac: 1, props: { name: '', width: 50, left: 10, top: 10 }, label: 'Empty Content' },
      { fac: 1, props: { name: 'Positioned', width: 80, left: 0, top: 0 }, label: 'Zero Position' }
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', padding: '20px' }}>
        {edgeCases.map((testCase, index) => (
          <div key={index} style={{ position: 'relative', minHeight: '120px', border: '1px dashed #ccc', padding: '15px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>{testCase.label}</h4>
            <RightBlockComp
              fac={testCase.fac}
              props={testCase.props}
              bg="#f8f9fa"
              font="#495057"
              fontFamily="Courier New, monospace"
              template={RightBlockTemplate.TEMPLATE_3}
              id={`edge-${index}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Props validation with defaults
 */
export const PropsValidation: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <div style={{ position: 'relative', minHeight: '80px', border: '1px solid #ccc', padding: '10px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>Minimal Props (Defaults Applied)</h4>
          <RightBlockComp
            fac={1}
            props={{ name: 'Default Values', width: 100, left: 20, top: 15 }}
          />
        </div>
        <div style={{ position: 'relative', minHeight: '80px', border: '1px solid #ccc', padding: '10px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>All Props Specified</h4>
          <RightBlockComp
            fac={1.3}
            props={{ name: 'All Props Set', width: 120, left: 25, top: 20 }}
            bg="#e1f5fe"
            font="#01579b"
            fontFamily="Helvetica, Arial, sans-serif"
            template={RightBlockTemplate.TEMPLATE_2}
            id="full-props-demo"
            className="custom-block"
          />
        </div>
      </div>
    );
  }
};
