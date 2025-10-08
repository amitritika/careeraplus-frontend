import type { Meta, StoryObj } from '@storybook/react';
import { BlockPub, BlockPubTemplate, PublicationData } from './BlockPub';

/**
 * Sample publication data for testing
 */
const samplePublicationData: PublicationData = {
  title: "Machine Learning in Modern Healthcare Systems",
  name: "Dr. Sarah Johnson",
  journal: "Journal of Medical Technology",
  year: "2024",
  pages: "123-135",
};

const alternativePublicationData: PublicationData = {
  title: "Sustainable Energy Solutions for Urban Development", 
  name: "Prof. Michael Chen",
  journal: "Environmental Science Quarterly",
  year: "2023",
  pages: "45-67",
};

const shortPublicationData: PublicationData = {
  title: "AI Ethics",
  name: "A. Smith", 
  journal: "Tech Review",
  year: "2024",
  pages: "",
};

const longPublicationData: PublicationData = {
  title: "Comprehensive Analysis of Distributed Systems Architecture in Cloud Computing Environments",
  name: "Dr. Elizabeth Thompson-Williams",
  journal: "International Conference on Distributed Computing and Cloud Technologies",
  year: "2023",
  pages: "1247-1289",
};

const meta: Meta<typeof BlockPub> = {
  title: 'Components/BlockPub',
  component: BlockPub,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A consolidated publication block component supporting multiple template variations with configurable styling and layout options.',
      },
    },
  },
  // Only include TOP-LEVEL component props in argTypes
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3.0, step: 0.1 },
      description: 'Scaling factor for all dimensions',
    },
    template: {
      control: { type: 'select' },
      options: ['template1', 'template2', 'template3', 'template4', 'template5'],
      description: 'Template variant to use',
    },
    bg: {
      control: { type: 'color' },
      description: 'Background color (RGB string)',
    },
    font: {
      control: { type: 'color' }, 
      description: 'Font color (RGB string)',
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
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '300px', width: '100%', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive controls story - only uses top-level props in args
 */
export const Interactive: Story = {
  args: {
    fac: 1.0,
    template: 'template1',
    bg: 'rgb(255, 255, 255)',
    font: 'rgb(0, 0, 0)', 
    fontFamily: 'Arial, sans-serif',
    id: 'interactive-blockpub',
    className: '',
    props: {
      height: 20,
      top: 10,
      data: samplePublicationData,
      line: true,
    },
  },
};

/**
 * Template 1 - Basic layout with vertical line only
 */
export const Template1: Story = {
  args: {
    fac: 1.0,
    template: 'template1',
    bg: 'rgb(248, 249, 250)',
    font: 'rgb(33, 37, 41)',
    fontFamily: 'Georgia, serif',
    props: {
      height: 18,
      top: 5,
      data: samplePublicationData,
    },
  },
};

/**
 * Template 2 - With conditional vertical line (bottom positioning)
 */
export const Template2: Story = {
  args: {
    fac: 1.0,
    template: 'template2', 
    bg: 'rgb(255, 248, 240)',
    font: 'rgb(102, 77, 3)',
    fontFamily: 'Times New Roman, serif',
    props: {
      height: 22,
      top: 8,
      data: alternativePublicationData,
      line: true,
    },
  },
};

/**
 * Template 3 - With conditional vertical line (top positioning)
 */
export const Template3: Story = {
  args: {
    fac: 1.0,
    template: 'template3',
    bg: 'rgb(240, 248, 255)',
    font: 'rgb(13, 60, 97)',
    fontFamily: 'Helvetica, Arial, sans-serif',
    props: {
      height: 20,
      top: 12,
      data: samplePublicationData,
      line: true,
    },
  },
};

/**
 * Template 4 - With horizontal line at top
 */
export const Template4: Story = {
  args: {
    fac: 1.0,
    template: 'template4',
    bg: 'rgb(248, 255, 248)',
    font: 'rgb(22, 101, 52)',
    fontFamily: 'Verdana, sans-serif',
    props: {
      height: 24,
      top: 15,
      data: shortPublicationData,
    },
  },
};

/**
 * Template 5 - With border and horizontal line
 */
export const Template5: Story = {
  args: {
    fac: 1.0,
    template: 'template5',
    bg: 'rgb(255, 240, 245)',
    font: 'rgb(136, 23, 152)',
    fontFamily: 'Trebuchet MS, sans-serif',
    props: {
      height: 26,
      top: 20,
      data: longPublicationData,
    },
  },
};

/**
 * Template Comparison - Side-by-side view of all templates
 */
export const TemplateComparison: Story = {
  render: () => {
    const templates: BlockPubTemplate[] = ['template1', 'template2', 'template3', 'template4', 'template5'];
    const colors = [
      { bg: 'rgb(248, 249, 250)', font: 'rgb(33, 37, 41)' },
      { bg: 'rgb(255, 248, 240)', font: 'rgb(102, 77, 3)' },
      { bg: 'rgb(240, 248, 255)', font: 'rgb(13, 60, 97)' },
      { bg: 'rgb(248, 255, 248)', font: 'rgb(22, 101, 52)' },
      { bg: 'rgb(255, 240, 245)', font: 'rgb(136, 23, 152)' },
    ];

    return (
      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        {templates.map((template, index) => (
          <BlockPub
            key={template}
            fac={0.8}
            template={template}
            bg={colors[index].bg}
            font={colors[index].font}
            fontFamily="Arial, sans-serif"
            props={{
              height: 20,
              top: index * 60,
              data: {
                ...samplePublicationData,
                name: `${template.toUpperCase()} - ${samplePublicationData.name}`,
              },
              line: index === 1 || index === 2, // Show line for templates 2 and 3
            }}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all template variations side by side with different color schemes.',
      },
    },
  },
};

/**
 * Responsive Scaling - Different fac values
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.6, 0.8, 1.0, 1.2, 1.5];

    return (
      <div style={{ position: 'relative', height: '500px', width: '100%' }}>
        {scales.map((scale, index) => (
          <BlockPub
            key={`scale-${scale}`}
            fac={scale}
            template="template3"
            bg="rgb(240, 248, 255)"
            font="rgb(13, 60, 97)"
            fontFamily="Arial, sans-serif"
            props={{
              height: 18,
              top: index * 80,
              data: {
                ...samplePublicationData,
                name: `Scale ${scale}x - ${samplePublicationData.name}`,
              },
              line: true,
            }}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates responsive scaling with different fac values from 0.6x to 1.5x.',
      },
    },
  },
};

/**
 * Accessibility Testing - High contrast and large text
 */
export const AccessibilityTesting: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '300px', width: '100%' }}>
      {/* High contrast version */}
      <BlockPub
        fac={1.2}
        template="template4"
        bg="rgb(255, 255, 255)"
        font="rgb(0, 0, 0)"
        fontFamily="Arial, sans-serif"
        props={{
          height: 22,
          top: 5,
          data: {
            ...samplePublicationData,
            name: "High Contrast - " + samplePublicationData.name,
          },
        }}
      />

      {/* Large text version */}
      <BlockPub
        fac={1.8}
        template="template5"
        bg="rgb(0, 0, 0)"
        font="rgb(255, 255, 255)"
        fontFamily="Arial, sans-serif"
        props={{
          height: 20,
          top: 120,
          data: {
            ...samplePublicationData,
            name: "Large Text - " + samplePublicationData.name,
          },
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility testing with high contrast colors and large text scaling.',
      },
    },
  },
};

/**
 * Edge Cases - Extreme values and content lengths
 */
export const EdgeCases: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      {/* Very small scale */}
      <BlockPub
        fac={0.4}
        template="template1"
        bg="rgb(255, 255, 255)"
        font="rgb(0, 0, 0)"
        fontFamily="Arial, sans-serif"
        props={{
          height: 15,
          top: 5,
          data: shortPublicationData,
        }}
      />

      {/* Very large scale with long content */}
      <BlockPub
        fac={0.7}
        template="template5"
        bg="rgb(248, 249, 250)"
        font="rgb(33, 37, 41)"
        fontFamily="Arial, sans-serif"
        props={{
          height: 30,
          top: 50,
          data: longPublicationData,
        }}
      />

      {/* Empty pages field */}
      <BlockPub
        fac={1.0}
        template="template2"
        bg="rgb(255, 248, 240)"
        font="rgb(102, 77, 3)"
        fontFamily="Arial, sans-serif"
        props={{
          height: 18,
          top: 150,
          data: {
            ...samplePublicationData,
            pages: "", // Empty pages
          },
          line: true,
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases including extreme scaling values, long content, and missing data fields.',
      },
    },
  },
};

/**
 * Props Validation - Default values and missing optionals
 */
export const PropsValidation: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '200px', width: '100%' }}>
      {/* Minimal required props */}
      <BlockPub
        fac={1.0}
        template="template1"
        bg="rgb(255, 255, 255)"
        font="rgb(0, 0, 0)"
        fontFamily="Arial"
        props={{
          height: 20,
          top: 10,
          data: {
            title: "Minimal Data",
            name: "Test Author",
            journal: "Test Journal", 
            year: "2024",
          },
        }}
      />

      {/* With all optional props */}
      <BlockPub
        fac={1.0}
        template="template3"
        bg="rgb(240, 248, 255)"
        font="rgb(13, 60, 97)"
        fontFamily="Georgia, serif"
        id="validation-test"
        className="test-class"
        props={{
          height: 22,
          top: 80,
          data: {
            ...samplePublicationData,
            pages: "100-120",
          },
          line: true,
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Validation of props with minimal required values and full optional properties.',
      },
    },
  },
};