import type { Meta, StoryObj } from '@storybook/react';
import { VL, VLProps } from './VL';

const meta: Meta<typeof VL> = {
  title: 'Components/VL',
  component: VL,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'VL (Vertical Line) component with 5 template variations for different visual layouts and styling options.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions'
    },
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variant selection'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color in RGB format'
    },
    font: {
      control: { type: 'color' },
      description: 'Font color in RGB format'
    },
    id: {
      control: { type: 'text' },
      description: 'Unique identifier for the component'
    },
    className: {
      control: { type: 'text' },
      description: 'Optional CSS class name'
    }
  },
  args: {
    fac: 1,
    bg: 'rgb(33, 37, 41)',
    font: 'rgb(255, 255, 255)',
    id: 'vl-story',
    template: 1,
    props: {
      height: 100,
      top: 20
    }
  }
} satisfies Meta<typeof VL>;

export default meta;
type Story = StoryObj<typeof meta>;

// Individual Template Stories
export const Template1: Story = {
  args: {
    template: 1,
    fac: 1,
    bg: 'rgb(33, 37, 41)',
    font: 'rgb(255, 255, 255)',
    id: 'vl-template-1',
    props: {
      height: 100,
      top: 20
    }
  }
};

export const Template2: Story = {
  args: {
    template: 2,
    fac: 1,
    bg: 'rgb(0, 123, 255)',
    font: 'rgb(255, 255, 255)',
    id: 'vl-template-2',
    props: {
      height: 100,
      top: 20
    }
  }
};

export const Template3: Story = {
  args: {
    template: 3,
    fac: 1,
    bg: 'rgb(220, 53, 69)',
    font: 'rgb(255, 255, 255)',
    id: 'vl-template-3',
    props: {
      height: 80, // Note: Template 3 uses fixed height of 267
      top: 15
    }
  }
};

export const Template4: Story = {
  args: {
    template: 4,
    fac: 1,
    bg: 'rgb(40, 167, 69)',
    font: 'rgb(255, 255, 255)',
    id: 'vl-template-4',
    props: {
      height: 100,
      top: 20
    }
  }
};

export const Template5: Story = {
  args: {
    template: 5,
    fac: 1,
    bg: 'rgb(255, 193, 7)',
    font: 'rgb(33, 37, 41)',
    id: 'vl-template-5',
    props: {
      height: 120,
      top: 25
    }
  }
};

// Interactive Controls Story
export const InteractiveControls: Story = {
  args: {
    fac: 1.2,
    template: 1,
    bg: 'rgb(108, 117, 125)',
    font: 'rgb(255, 255, 255)',
    id: 'vl-interactive',
    props: {
      height: 90,
      top: 30
    }
  }
};

// Template Showcase Story
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseData = [
      {
        template: 1 as const,
        bg: 'rgb(33, 37, 41)',
        label: 'Template 1: Basic (left=12)'
      },
      {
        template: 2 as const,
        bg: 'rgb(0, 123, 255)',
        label: 'Template 2: Basic (left=12)'
      },
      {
        template: 3 as const,
        bg: 'rgb(220, 53, 69)',
        label: 'Template 3: Fixed Height (left=80, height=267)'
      },
      {
        template: 4 as const,
        bg: 'rgb(40, 167, 69)',
        label: 'Template 4: Basic (left=12)'
      },
      {
        template: 5 as const,
        bg: 'rgb(255, 193, 7)',
        label: 'Template 5: RGBA Border (left=80)'
      }
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', padding: '20px' }}>
        {showcaseData.map(({ template, bg, label }) => (
          <div key={template} style={{ position: 'relative', border: '1px solid #ccc', height: '300px', width: '150px' }}>
            <h4 style={{ margin: '5px', fontSize: '12px', textAlign: 'center' }}>{label}</h4>
            <VL
              template={template}
              fac={1}
              bg={bg}
              font="rgb(255, 255, 255)"
              id={`showcase-${template}`}
              props={{ height: 100, top: 40 }}
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
    const scalingFactors = [0.5, 0.8, 1, 1.2, 1.5, 2];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', padding: '20px' }}>
        {scalingFactors.map((fac) => (
          <div key={fac} style={{ position: 'relative', border: '1px solid #ddd', height: '200px', width: '120px' }}>
            <h4 style={{ margin: '5px', fontSize: '11px', textAlign: 'center' }}>Scale: {fac}x</h4>
            <VL
              template={1}
              fac={fac}
              bg="rgb(0, 123, 255)"
              font="rgb(255, 255, 255)"
              id={`scale-${fac}`}
              props={{ height: 80, top: 30 }}
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
    const accessibilityVariants = [
      {
        bg: 'rgb(0, 0, 0)',
        font: 'rgb(255, 255, 255)',
        label: 'High Contrast Black'
      },
      {
        bg: 'rgb(255, 255, 255)',
        font: 'rgb(0, 0, 0)',
        label: 'High Contrast White'
      },
      {
        bg: 'rgb(0, 76, 153)',
        font: 'rgb(255, 255, 255)',
        label: 'WCAG AA Blue'
      },
      {
        bg: 'rgb(153, 0, 76)',
        font: 'rgb(255, 255, 255)',
        label: 'WCAG AA Magenta'
      }
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', padding: '20px' }}>
        {accessibilityVariants.map(({ bg, font, label }, index) => (
          <div key={index} style={{ position: 'relative', border: '2px solid #333', height: '250px', width: '180px' }}>
            <h4 style={{ margin: '5px', fontSize: '12px', textAlign: 'center' }}>{label}</h4>
            <VL
              template={5}
              fac={1.2}
              bg={bg}
              font={font}
              id={`accessibility-${index}`}
              props={{ height: 100, top: 35 }}
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
    const edgeCases = [
      {
        fac: 0.1,
        props: { height: 10, top: 5 },
        label: 'Minimum Scale'
      },
      {
        fac: 3,
        props: { height: 50, top: 10 },
        label: 'Maximum Scale'
      },
      {
        fac: 1,
        props: { height: 500, top: 100 },
        label: 'Large Height'
      },
      {
        fac: 1,
        props: { height: 5, top: 200 },
        label: 'Small Height, High Top'
      }
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', padding: '20px' }}>
        {edgeCases.map(({ fac, props, label }, index) => (
          <div key={index} style={{ position: 'relative', border: '1px solid #999', height: '350px', width: '200px' }}>
            <h4 style={{ margin: '5px', fontSize: '11px', textAlign: 'center' }}>{label}</h4>
            <div style={{ fontSize: '10px', textAlign: 'center', color: '#666' }}>
              fac: {fac}, height: {props.height}, top: {props.top}
            </div>
            <VL
              template={2}
              fac={fac}
              bg="rgb(108, 117, 125)"
              font="rgb(255, 255, 255)"
              id={`edge-case-${index}`}
              props={props}
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
    const validationTests = [
      {
        props: {
          fac: 1,
          bg: 'rgb(33, 37, 41)',
          font: 'rgb(255, 255, 255)',
          id: 'validation-1',
          template: 1 as const,
          props: { height: 100, top: 20 }
        },
        label: 'All Props Provided'
      },
      {
        props: {
          fac: 1.5,
          bg: 'rgb(220, 53, 69)',
          font: 'rgb(255, 255, 255)',
          id: 'validation-2',
          props: { height: 80, top: 30 }
          // template omitted (should default to 1)
        },
        label: 'Default Template (1)'
      },
      {
        props: {
          fac: 0.8,
          bg: 'rgb(40, 167, 69)',
          font: 'rgb(255, 255, 255)',
          id: 'validation-3',
          template: 5 as const,
          props: { height: 120, top: 15 },
          className: 'custom-vl-class'
        },
        label: 'With Custom Class'
      }
    ];

    return (
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        {validationTests.map(({ props, label }, index) => (
          <div key={index} style={{ position: 'relative', border: '1px solid #aaa', height: '200px', width: '150px' }}>
            <h4 style={{ margin: '5px', fontSize: '11px', textAlign: 'center' }}>{label}</h4>
            <VL {...props} />
          </div>
        ))}
      </div>
    );
  }
};
