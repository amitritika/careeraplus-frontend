import type { Meta, StoryObj } from '@storybook/react';
import { RightBlockProject, type RightBlockProjectProps, type TemplateType } from './RightBlockProject';

/**
 * Mock project data for testing and demonstration
 */
const mockProjectData = {
  title: 'E-Commerce Platform Development',
  desc: '<p>Developed a comprehensive e-commerce platform using <strong>React</strong> and <strong>Node.js</strong>. Implemented features including product catalog, shopping cart, payment processing, and order management system.</p>',
  designation: {
    value: 'Senior Full Stack Developer',
    optional: true,
  },
  date: {
    startDate: 'Jan 2024',
    endDate: 'Mar 2024',
    optional: true,
  },
  client: {
    value: 'TechCorp Solutions',
    optional: true,
  },
};

/**
 * Alternative project data for variation testing
 */
const mockProjectDataShort = {
  title: 'Mobile App UI Design',
  desc: '<p>Created modern, responsive UI designs for iOS and Android applications.</p>',
  designation: {
    value: 'UI/UX Designer',
    optional: false,
  },
  date: {
    startDate: 'Dec 2023',
    endDate: 'Jan 2024',
    optional: false,
  },
  client: {
    value: 'StartupXYZ',
    optional: false,
  },
};

const meta: Meta<typeof RightBlockProject> = {
  title: 'Components/RightBlockProject',
  component: RightBlockProject,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# RightBlockProject Component

A consolidated project block component supporting 5 different template variations with configurable positioning, 
line elements, and border styling. Maintains pixel-perfect visual parity with original template implementations.

## Features

- **5 Template Variations**: Each with unique positioning and styling characteristics
- **Responsive Scaling**: Uses fac multiplier for consistent scaling across different sizes  
- **Conditional Elements**: Lines and borders rendered based on template configuration
- **Secure HTML Parsing**: Uses html-react-parser for safe HTML content rendering
- **TypeScript Support**: Complete type safety with detailed interfaces
- **Performance Optimized**: Memoized calculations and helper functions

## Template Differences

- **Template 1**: Basic layout without line or border elements
- **Template 2**: Includes vertical line positioned at specific coordinates
- **Template 3**: Vertical line with alternative positioning values
- **Template 4**: Line with minimal top offset positioning  
- **Template 5**: Different main positioning with border styling and RGBA conversion
        `,
      },
    },
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for responsive dimensions',
    },
    template: {
      control: { type: 'select' },
      options: ['template1', 'template2', 'template3', 'template4', 'template5'],
      description: 'Template variation selector',
    },
    bg: {
      control: { type: 'color' },
      description: 'Background/accent color',
    },
    font: {
      control: { type: 'color' },
      description: 'Text color',
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
      description: 'CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RightBlockProject>;

// Base props for stories
const baseProps: RightBlockProjectProps = {
  fac: 1,
  props: {
    height: 50,
    top: 0,
    line: true,
    data: mockProjectData,
  },
  bg: 'rgb(59, 130, 246)',
  font: '#1f2937',
  fontFamily: 'Inter, system-ui, sans-serif',
};

/**
 * Individual Template Stories - Fixed configurations demonstrating each template
 */
export const Template1: Story = {
  args: {
    ...baseProps,
    template: 'template1',
    props: {
      ...baseProps.props,
      line: false, // Template 1 doesn't use lines
    },
  },
};

export const Template2: Story = {
  args: {
    ...baseProps,
    template: 'template2',
  },
};

export const Template3: Story = {
  args: {
    ...baseProps,
    template: 'template3',
  },
};

export const Template4: Story = {
  args: {
    ...baseProps,
    template: 'template4',
  },
};

export const Template5: Story = {
  args: {
    ...baseProps,
    template: 'template5',
    bg: 'rgb(34, 197, 94)', // Different color to showcase border conversion
  },
};

/**
 * Interactive Controls Story - Uses only top-level props in argTypes
 */
export const InteractiveControls: Story = {
  args: baseProps,
};

/**
 * Template Showcase - Side-by-side comparison using render function
 */
export const TemplateShowcase: Story = {
  render: () => {
    const templates: TemplateType[] = ['template1', 'template2', 'template3', 'template4', 'template5'];
    const colors = ['rgb(59, 130, 246)', 'rgb(34, 197, 94)', 'rgb(168, 85, 247)', 'rgb(239, 68, 68)', 'rgb(245, 158, 11)'];
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '1rem' }}>
        {templates.map((template, index) => (
          <div key={template} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', textTransform: 'capitalize', color: colors[index] }}>
              {template}
            </h3>
            <RightBlockProject
              {...baseProps}
              template={template}
              bg={colors[index]}
              props={{
                ...baseProps.props,
                line: template !== 'template1', // Template 1 doesn't use lines
              }}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Responsive Scaling Story - Different fac values
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scales = [0.7, 1.0, 1.5, 2.0];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
        {scales.map((scale) => (
          <div key={scale} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Scale Factor: {scale}x</h3>
            <RightBlockProject
              {...baseProps}
              fac={scale}
              template="template2"
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Content Variations - Different project data
 */
export const ContentVariations: Story = {
  render: () => {
    const variations = [
      {
        title: 'Full Project Data',
        data: mockProjectData,
      },
      {
        title: 'Minimal Project Data',
        data: mockProjectDataShort,
      },
      {
        title: 'No Metadata',
        data: {
          ...mockProjectData,
          designation: { ...mockProjectData.designation, optional: false },
          date: { ...mockProjectData.date, optional: false },
          client: { ...mockProjectData.client, optional: false },
        },
      },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
        {variations.map((variation, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>{variation.title}</h3>
            <RightBlockProject
              {...baseProps}
              template="template3"
              props={{
                ...baseProps.props,
                data: variation.data,
              }}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Accessibility Testing - High contrast and large text variations
 */
export const AccessibilityTesting: Story = {
  render: () => {
    const a11yVariations = [
      {
        name: 'High Contrast',
        props: { ...baseProps, bg: '#000000', font: '#ffffff', fac: 1.2 },
      },
      {
        name: 'Large Text',
        props: { ...baseProps, fac: 1.8 },
      },
      {
        name: 'Color Blind Safe',
        props: { ...baseProps, bg: 'rgb(213, 94, 0)', font: '#000000' },
      },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
        {a11yVariations.map((variation, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>{variation.name}</h3>
            <RightBlockProject
              {...variation.props}
              template="template2"
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Edge Cases Story - Extreme values and content lengths
 */
export const EdgeCases: Story = {
  render: () => {
    const extremeData = {
      title: 'Very Long Project Title That Might Wrap to Multiple Lines and Test Layout Boundaries',
      desc: '<p>This is an extremely long description that contains multiple sentences and various HTML elements to test how the component handles extensive content. <strong>It includes bold text</strong>, and other formatting to ensure proper rendering.</p><p>Multiple paragraphs are also included to test vertical spacing and layout consistency across different template variations.</p>',
      designation: { value: 'Senior Principal Staff Software Architect', optional: true },
      date: { startDate: 'January 2024', endDate: 'December 2024', optional: true },
      client: { value: 'Very Long Client Name Corporation LLC', optional: true },
    };

    const shortData = {
      title: 'Short',
      desc: '<p>Brief.</p>',
      designation: { value: 'Dev', optional: true },
      date: { startDate: 'Jan', endDate: 'Feb', optional: true },
      client: { value: 'Co', optional: true },
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Extreme Long Content</h3>
          <RightBlockProject
            {...baseProps}
            template="template5"
            props={{
              height: 80,
              top: 0,
              line: true,
              data: extremeData,
            }}
          />
        </div>
        
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Minimal Content</h3>
          <RightBlockProject
            {...baseProps}
            template="template4"
            props={{
              height: 30,
              top: 0,
              line: true,
              data: shortData,
            }}
          />
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Props Validation Story - Default values and missing optionals
 */
export const PropsValidation: Story = {
  render: () => {
    const validationCases = [
      {
        name: 'All Required Props Only',
        component: (
          <RightBlockProject
            fac={1}
            props={{
              height: 40,
              top: 0,
              data: {
                title: 'Required Props Only',
                desc: '<p>Testing with minimal required props.</p>',
                designation: { value: '', optional: false },
                date: { startDate: '', endDate: '', optional: false },
                client: { value: '', optional: false },
              },
            }}
            bg="rgb(59, 130, 246)"
            font="#1f2937"
          />
        ),
      },
      {
        name: 'With All Optional Props',
        component: (
          <RightBlockProject
            {...baseProps}
            id="test-component"
            className="test-class"
            fontFamily="Georgia, serif"
            template="template3"
          />
        ),
      },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
        {validationCases.map((testCase, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>{testCase.name}</h3>
            {testCase.component}
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};
