import type { Meta, StoryObj } from '@storybook/react';
import LeftBlockBullet, { LeftBlockBulletTemplate, LeftBlockBulletProps } from './LeftBlockBullet';

const meta: Meta<typeof LeftBlockBullet> = {
  title: 'Components/LeftBlockBullet',
  component: LeftBlockBullet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A configurable bullet point component for resume templates with 5 different styling variations.',
      },
    },
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family (defaults to Calibri)'
    },
    id: {
      control: { type: 'text' },
      description: 'Element ID'
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name'
    },
    template: {
      control: { type: 'select' },
      options: Object.values(LeftBlockBulletTemplate),
      description: 'Template variation'
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<LeftBlockBulletProps>;

// Base props for consistent testing
const baseProps = {
  fac: 1,
  bg: '#f0f8ff',
  font: '#333333',
  fontFamily: 'Calibri',
  props: {
    height: 20,
    name: 'Software Engineer with 5+ years experience in <strong>React</strong> development',
    top: 0,
    line: 1
  }
};

// Individual template stories with fixed configurations
export const Template1: Story = {
  args: {
    ...baseProps,
    template: LeftBlockBulletTemplate.TEMPLATE1,
    id: 'template1-demo'
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard bullet point with basic styling and 76px width.',
      },
    },
  },
};

export const Template2: Story = {
  args: {
    ...baseProps,
    template: LeftBlockBulletTemplate.TEMPLATE2,
    id: 'template2-demo'
  },
  parameters: {
    docs: {
      description: {
        story: 'Bullet point with conditional vertical line when line=1.',
      },
    },
  },
};

export const Template3: Story = {
  args: {
    ...baseProps,
    template: LeftBlockBulletTemplate.TEMPLATE3,
    id: 'template3-demo'
  },
  parameters: {
    docs: {
      description: {
        story: 'Bullet point with bold text styling.',
      },
    },
  },
};

export const Template4: Story = {
  args: {
    ...baseProps,
    template: LeftBlockBulletTemplate.TEMPLATE4,
    id: 'template4-demo'
  },
  parameters: {
    docs: {
      description: {
        story: 'Bullet point with italic text styling.',
      },
    },
  },
};

export const Template5: Story = {
  args: {
    ...baseProps,
    template: LeftBlockBulletTemplate.TEMPLATE5,
    id: 'template5-demo'
  },
  parameters: {
    docs: {
      description: {
        story: 'Bullet point with reduced width (74px) and increased left offset (6px).',
      },
    },
  },
};

// Interactive controls story with only top-level props
export const Interactive: Story = {
  args: baseProps,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with all controllable properties. Use the controls panel to experiment with different values.',
      },
    },
  },
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseProps = {
      ...baseProps,
      props: {
        ...baseProps.props,
        name: 'Resume Bullet Point'
      }
    };

    const templates = [
      { template: LeftBlockBulletTemplate.TEMPLATE1, name: 'Template 1 - Standard' },
      { template: LeftBlockBulletTemplate.TEMPLATE2, name: 'Template 2 - With Line' },
      { template: LeftBlockBulletTemplate.TEMPLATE3, name: 'Template 3 - Bold' },
      { template: LeftBlockBulletTemplate.TEMPLATE4, name: 'Template 4 - Italic' },
      { template: LeftBlockBulletTemplate.TEMPLATE5, name: 'Template 5 - Narrow' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        {templates.map(({ template, name }) => (
          <div key={template} style={{ position: 'relative', height: '30px', border: '1px dashed #ccc', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>{name}</h4>
            <LeftBlockBullet
              {...showcaseProps}
              template={template}
              id={`showcase-${template}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all 5 template variations.',
      },
    },
  },
};

// Responsive scaling story
export const ResponsiveScaling: Story = {
  render: () => {
    const scalingFactors = [0.8, 1.0, 1.2, 1.5];
    const scalingProps = {
      ...baseProps,
      props: {
        ...baseProps.props,
        name: 'Scalable Content'
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', padding: '20px' }}>
        {scalingFactors.map(fac => (
          <div key={fac} style={{ position: 'relative', height: `${fac * 30}px`, border: '1px dashed #ccc', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>Scale Factor: {fac}x</h4>
            <LeftBlockBullet
              {...scalingProps}
              fac={fac}
              template={LeftBlockBulletTemplate.TEMPLATE1}
              id={`scaling-${fac}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates responsive scaling at different fac values.',
      },
    },
  },
};

// Accessibility testing with high contrast
export const AccessibilityDemo: Story = {
  render: () => {
    const accessibilityVariants = [
      { bg: '#000000', font: '#ffffff', name: 'High Contrast Dark' },
      { bg: '#ffffff', font: '#000000', name: 'High Contrast Light' },
      { bg: '#003366', font: '#ffff99', name: 'Blue-Yellow Contrast' },
      { bg: '#330066', font: '#ccffcc', name: 'Purple-Green Contrast' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        {accessibilityVariants.map(variant => (
          <div key={variant.name} style={{ position: 'relative', height: '30px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>{variant.name}</h4>
            <LeftBlockBullet
              {...baseProps}
              bg={variant.bg}
              font={variant.font}
              template={LeftBlockBulletTemplate.TEMPLATE1}
              id={`accessibility-${variant.name.toLowerCase().replace(/\s+/g, '-')}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility testing with high-contrast color combinations.',
      },
    },
  },
};

// Edge cases story
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        name: 'Long Content',
        props: { ...baseProps.props, name: 'This is a very long bullet point with extensive content that tests text wrapping and overflow handling in various scenarios' }
      },
      {
        name: 'HTML Entities',
        props: { ...baseProps.props, name: 'Content with &lt;script&gt; tags &amp; special chars like &quot;quotes&quot; and &apos;apostrophes&apos;' }
      },
      {
        name: 'Minimal Height',
        props: { ...baseProps.props, height: 10, name: 'Tiny' }
      },
      {
        name: 'Large Height',
        props: { ...baseProps.props, height: 60, name: 'Large bullet block' }
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '20px' }}>
        {edgeCases.map(testCase => (
          <div key={testCase.name} style={{ position: 'relative', height: `${testCase.props.height + 20}px`, border: '1px dashed #ccc', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>{testCase.name}</h4>
            <LeftBlockBullet
              {...baseProps}
              props={testCase.props}
              template={LeftBlockBulletTemplate.TEMPLATE1}
              id={`edge-case-${testCase.name.toLowerCase().replace(/\s+/g, '-')}`}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge cases testing with extreme values and content lengths.',
      },
    },
  },
};

// Props validation story
export const PropsValidation: Story = {
  render: () => {
    const validationTests = [
      {
        name: 'Default Props',
        props: { fac: 1, bg: '#f0f0f0', font: '#000000', props: { height: 20, name: 'Default', top: 0 } }
      },
      {
        name: 'With Optional Props',
        props: { fac: 1, bg: '#f0f0f0', font: '#000000', fontFamily: 'Arial', id: 'test-id', className: 'test-class', props: { height: 20, name: 'With Optionals', top: 0, line: 1 } }
      },
      {
        name: 'Missing Line Prop',
        props: { fac: 1, bg: '#f0f0f0', font: '#000000', template: LeftBlockBulletTemplate.TEMPLATE2, props: { height: 20, name: 'No Line Prop', top: 0 } }
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        {validationTests.map(test => (
          <div key={test.name} style={{ position: 'relative', height: '30px', border: '1px dashed #ccc', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>{test.name}</h4>
            <LeftBlockBullet {...test.props} />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Props validation testing with default values and missing optionals.',
      },
    },
  },
};
