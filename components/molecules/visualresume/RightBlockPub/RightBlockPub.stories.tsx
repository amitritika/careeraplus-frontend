import type { Meta, StoryObj } from '@storybook/react';
import RightBlockPub, { 
  RightBlockPubComponentProps, 
  RightBlockPubTemplate,
  PublicationData 
} from './RightBlockPub';

const meta: Meta<typeof RightBlockPub> = {
  title: 'Components/RightBlockPub',
  component: RightBlockPub,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A consolidated publication block component supporting 5 template variations with scalable dimensions and template-specific line elements.',
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
      mapping: {
        1: RightBlockPubTemplate.TEMPLATE_1,
        2: RightBlockPubTemplate.TEMPLATE_2,
        3: RightBlockPubTemplate.TEMPLATE_3,
        4: RightBlockPubTemplate.TEMPLATE_4,
        5: RightBlockPubTemplate.TEMPLATE_5,
      },
      description: 'Template variant to use',
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color for line elements',
    },
    font: {
      control: { type: 'color' },
      description: 'Font color for text elements',
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family for text',
    },
    id: {
      control: { type: 'text' },
      description: 'Element ID',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '400px', 
        height: '200px', 
        position: 'relative',
        border: '1px dashed #ccc',
        backgroundColor: '#f9f9f9'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock publication data
const mockPublicationData: PublicationData = {
  title: 'Advanced React Component Patterns and Performance Optimization Techniques',
  name: 'Dr. Sarah Johnson, PhD',
  journal: 'Journal of Web Development',
  year: '2024',
  pages: '45-67',
};

const baseArgs: RightBlockPubComponentProps = {
  fac: 1.2,
  template: RightBlockPubTemplate.TEMPLATE_1,
  bg: 'rgb(59, 130, 246)',
  font: 'rgb(31, 41, 55)',
  fontFamily: 'Inter, Arial, sans-serif',
  id: 'right-block-pub-story',
  className: 'story-component',
  props: {
    height: 45,
    top: 10,
    line: true,
    data: mockPublicationData,
  },
};

// Individual template stories
export const Template1: Story = {
  args: {
    ...baseArgs,
    template: RightBlockPubTemplate.TEMPLATE_1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 1: Basic layout without any line elements. Clean publication display.',
      },
    },
  },
};

export const Template2: Story = {
  args: {
    ...baseArgs,
    template: RightBlockPubTemplate.TEMPLATE_2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 2: Includes conditional vertical line with specific positioning (lineT: 8, lineL: -5).',
      },
    },
  },
};

export const Template3: Story = {
  args: {
    ...baseArgs,
    template: RightBlockPubTemplate.TEMPLATE_3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 3: Vertical line with different positioning than Template 2 (lineT: 1.5, lineL: -7).',
      },
    },
  },
};

export const Template4: Story = {
  args: {
    ...baseArgs,
    template: RightBlockPubTemplate.TEMPLATE_4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 4: Features horizontal line element at the top (lineT: 0.5, lineL: -6).',
      },
    },
  },
};

export const Template5: Story = {
  args: {
    ...baseArgs,
    template: RightBlockPubTemplate.TEMPLATE_5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template 5: Different left positioning (6 vs 17) with horizontal line and border transparency.',
      },
    },
  },
};

// Interactive controls story
export const InteractiveControls: Story = {
  args: baseArgs,
  parameters: {
    docs: {
      description: {
        story: 'Interactive story with full control over all top-level component props. Use controls to explore different configurations.',
      },
    },
  },
};

// Template showcase with side-by-side comparison
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseData = {
      ...mockPublicationData,
      title: 'Comparative Study',
      name: 'Dr. Alex Smith',
    };

    const templates = [
      { template: RightBlockPubTemplate.TEMPLATE_1, title: 'Template 1 - Basic' },
      { template: RightBlockPubTemplate.TEMPLATE_2, title: 'Template 2 - Vertical Line' },
      { template: RightBlockPubTemplate.TEMPLATE_3, title: 'Template 3 - Alt Vertical' },
      { template: RightBlockPubTemplate.TEMPLATE_4, title: 'Template 4 - Horizontal' },
      { template: RightBlockPubTemplate.TEMPLATE_5, title: 'Template 5 - Compact' },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {templates.map(({ template, title }) => (
          <div key={template} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666' }}>{title}</h3>
            <div style={{ position: 'relative', height: '120px', backgroundColor: '#f9f9f9' }}>
              <RightBlockPub
                fac={1}
                template={template}
                bg="rgb(59, 130, 246)"
                font="rgb(31, 41, 55)"
                fontFamily="Inter, Arial, sans-serif"
                id={`showcase-${template}`}
                props={{
                  height: 45,
                  top: 10,
                  line: true,
                  data: showcaseData,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Side-by-side comparison of all 5 template variations showing their unique positioning and line elements.',
      },
    },
  },
};

// Responsive scaling demonstration
export const ResponsiveScaling: Story = {
  render: () => {
    const scalingData = { ...mockPublicationData, title: 'Scaling Demo' };
    const scales = [0.8, 1.0, 1.5, 2.0];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666' }}>Scale: {scale}x</h3>
            <div style={{ position: 'relative', height: `${120 * scale}px`, backgroundColor: '#f9f9f9' }}>
              <RightBlockPub
                fac={scale}
                template={RightBlockPubTemplate.TEMPLATE_2}
                bg="rgb(34, 197, 94)"
                font="rgb(22, 78, 99)"
                fontFamily="Inter, Arial, sans-serif"
                id={`scaling-${scale}`}
                props={{
                  height: 45,
                  top: 10,
                  line: true,
                  data: scalingData,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstrates responsive scaling behavior with different fac values maintaining proportional relationships.',
      },
    },
  },
};

// Accessibility testing with high contrast and large text
export const AccessibilityTesting: Story = {
  render: () => {
    const accessibilityConfigs = [
      {
        name: 'Standard',
        bg: 'rgb(59, 130, 246)',
        font: 'rgb(31, 41, 55)',
        fac: 1.0,
      },
      {
        name: 'High Contrast',
        bg: 'rgb(0, 0, 0)',
        font: 'rgb(255, 255, 255)',
        fac: 1.0,
      },
      {
        name: 'Large Text',
        bg: 'rgb(99, 102, 241)',
        font: 'rgb(15, 23, 42)',
        fac: 1.5,
      },
      {
        name: 'Maximum Accessibility',
        bg: 'rgb(0, 0, 0)',
        font: 'rgb(255, 255, 255)',
        fac: 1.8,
      },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {accessibilityConfigs.map((config) => (
          <div key={config.name} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666' }}>{config.name}</h3>
            <div style={{ position: 'relative', height: `${100 * config.fac}px`, backgroundColor: config.font === 'rgb(255, 255, 255)' ? '#1f2937' : '#f9f9f9' }}>
              <RightBlockPub
                fac={config.fac}
                template={RightBlockPubTemplate.TEMPLATE_3}
                bg={config.bg}
                font={config.font}
                fontFamily="Inter, Arial, sans-serif"
                id={`accessibility-${config.name.toLowerCase().replace(' ', '-')}`}
                props={{
                  height: 45,
                  top: 10,
                  line: true,
                  data: mockPublicationData,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Accessibility testing with high contrast colors, large text options, and readability optimizations.',
      },
    },
  },
};

// Edge cases and extreme values testing
export const EdgeCasesTesting: Story = {
  render: () => {
    const edgeCases = [
      {
        name: 'Long Title',
        data: {
          ...mockPublicationData,
          title: 'An Extremely Long Research Paper Title That Tests How The Component Handles Very Long Text Content Without Breaking Layout',
        },
      },
      {
        name: 'No Pages',
        data: {
          ...mockPublicationData,
          pages: '',
        },
      },
      {
        name: 'Short Content',
        data: {
          title: 'Brief',
          name: 'J. Doe',
          journal: 'Nature',
          year: '2024',
          pages: '1',
        },
      },
      {
        name: 'Special Characters',
        data: {
          title: 'Études & Research: "Advanced" Methods',
          name: 'Dr. José María García-López',
          journal: 'Journal of Science & Technology',
          year: '2024',
          pages: '123-456',
        },
      },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', padding: '20px' }}>
        {edgeCases.map((testCase) => (
          <div key={testCase.name} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666' }}>{testCase.name}</h3>
            <div style={{ position: 'relative', height: '120px', backgroundColor: '#f9f9f9' }}>
              <RightBlockPub
                fac={1.2}
                template={RightBlockPubTemplate.TEMPLATE_4}
                bg="rgb(239, 68, 68)"
                font="rgb(55, 65, 81)"
                fontFamily="Georgia, serif"
                id={`edge-case-${testCase.name.toLowerCase().replace(' ', '-')}`}
                props={{
                  height: 45,
                  top: 10,
                  line: true,
                  data: testCase.data,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Tests edge cases including long titles, empty pages, short content, and special characters to ensure robust handling.',
      },
    },
  },
};

// Props validation with defaults and missing optionals
export const PropsValidation: Story = {
  render: () => {
    const validationTests = [
      {
        name: 'All Required Props',
        props: baseArgs,
      },
      {
        name: 'Missing Optional Props',
        props: {
          fac: 1.0,
          template: RightBlockPubTemplate.TEMPLATE_1,
          bg: 'rgb(34, 197, 94)',
          font: 'rgb(17, 24, 39)',
          id: 'validation-test',
          props: {
            height: 40,
            top: 5,
            data: mockPublicationData,
          },
        },
      },
      {
        name: 'Line Disabled',
        props: {
          ...baseArgs,
          template: RightBlockPubTemplate.TEMPLATE_2,
          props: {
            ...baseArgs.props,
            line: false,
          },
        },
      },
      {
        name: 'Minimum Values',
        props: {
          ...baseArgs,
          fac: 0.5,
          props: {
            height: 20,
            top: 0,
            line: true,
            data: {
              title: 'Min',
              name: 'A',
              journal: 'J',
              year: '24',
              pages: '1',
            },
          },
        },
      },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {validationTests.map((test) => (
          <div key={test.name} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666' }}>{test.name}</h3>
            <div style={{ position: 'relative', height: '120px', backgroundColor: '#f9f9f9' }}>
              <RightBlockPub {...test.props} />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Validates component behavior with default values, missing optional props, and minimum required values.',
      },
    },
  },
};
