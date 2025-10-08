import type { Meta, StoryObj } from '@storybook/react';
import { UserPhoto, UserPhotoProps, UserPhotoTemplate, PhotoPresets, createPhotoData } from './UserPhoto';

/**
 * Storybook meta configuration for UserPhoto component
 */
const meta: Meta<typeof UserPhoto> = {
  title: 'Resume Components/UserPhoto',
  component: UserPhoto,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# UserPhoto Component

A consolidated component for displaying user profile photos with 5 distinct visual templates.
Features optimized performance, template-based rendering, and comprehensive TypeScript support.

## Templates Available:
- **Template 1**: Basic rectangular photo
- **Template 2**: Container with margins and background  
- **Template 3**: Photo with shadow/background effect
- **Template 4**: Circular photo
- **Template 5**: Circular photo with semi-transparent border

## Key Features:
- Scalable dimensions via \`fac\` prop
- Template-specific positioning and styling
- Performance optimized with memoized calculations
- Error handling for missing photos
- Full accessibility support
        `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
  argTypes: {
    fac: {
      control: { 
        type: 'range', 
        min: 0.2, 
        max: 3.0, 
        step: 0.1 
      },
      description: 'Scaling factor for all dimensions and positioning',
      table: { 
        defaultValue: { summary: '1.0' },
        type: { summary: 'number' }
      },
    },
    template: {
      control: { 
        type: 'select'
      },
      options: [1, 2, 3, 4, 5] as UserPhotoTemplate[],
      description: 'Visual template variant (1-5)',
      table: { 
        defaultValue: { summary: '1' },
        type: { summary: 'UserPhotoTemplate' }
      },
    },
    bg: {
      control: { 
        type: 'color' 
      },
      description: 'Background color for borders and containers',
      table: { 
        defaultValue: { summary: '"rgb(66, 139, 202)"' },
        type: { summary: 'string' }
      },
    },
    font: {
      control: { 
        type: 'color' 
      },
      description: 'Font color (maintained for API compatibility)',
      table: { 
        defaultValue: { summary: '"#333333"' },
        type: { summary: 'string' }
      },
    },
    id: {
      control: { 
        type: 'text' 
      },
      description: 'Optional HTML element ID',
      table: { 
        type: { summary: 'string | undefined' }
      },
    },
    className: {
      control: { 
        type: 'text' 
      },
      description: 'Optional CSS class name',
      table: { 
        type: { summary: 'string | undefined' }
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserPhoto>;

/**
 * High-quality mock photos for testing
 */
const MOCK_PHOTOS = {
  professional: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format',
  creative: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=200&h=200&fit=crop&crop=face&auto=format',
  business: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&auto=format',
  casual: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face&auto=format',
  corporate: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face&auto=format',
} as const;

/**
 * Color palette for consistent testing
 */
const COLOR_PALETTE = {
  primary: 'rgb(66, 139, 202)',
  success: 'rgb(92, 184, 92)',  
  warning: 'rgb(240, 173, 78)',
  danger: 'rgb(217, 83, 79)',
  info: 'rgb(91, 192, 222)',
  dark: 'rgb(52, 58, 64)',
  light: 'rgb(248, 249, 250)',
} as const;

/**
 * Base configuration for consistent testing
 */
const createBaseProps = (overrides?: Partial<UserPhotoProps>): UserPhotoProps => ({
  fac: 1,
  props: createPhotoData(80, MOCK_PHOTOS.professional, 10, { r: 8 }),
  bg: COLOR_PALETTE.primary,
  font: '#333333',
  template: 1,
  ...overrides,
});

/**
 * Container component for consistent story layout
 */
const StoryContainer: React.FC<{ 
  children: React.ReactNode; 
  width?: number; 
  height?: number;
  title?: string;
}> = ({ 
  children, 
  width = 300, 
  height = 200, 
  title 
}) => (
  <div style={{ padding: '20px' }}>
    {title && <h4 style={{ marginBottom: '16px', color: '#333' }}>{title}</h4>}
    <div 
      style={{ 
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        border: '1px dashed #e0e0e0',
        borderRadius: '4px',
        backgroundColor: '#fafafa',
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  </div>
);

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

/**
 * Interactive controls for live testing
 */
export const InteractivePlayground: Story = {
  name: '🎮 Interactive Playground',
  args: createBaseProps(),
  render: (args) => (
    <StoryContainer title="Adjust controls to test different configurations">
      <UserPhoto {...args} />
    </StoryContainer>
  ),
};

// ============================================================================
// INDIVIDUAL TEMPLATE STORIES
// ============================================================================

/**
 * Template 1 - Basic rectangular photo
 */
export const Template1_BasicRectangle: Story = {
  name: '📐 Template 1 - Basic Rectangle',
  args: createBaseProps({ template: 1 }),
  render: (args) => (
    <StoryContainer title="Basic rectangular photo with simple positioning">
      <UserPhoto {...args} />
    </StoryContainer>
  ),
};

/**
 * Template 2 - Container with margins and background
 */
export const Template2_ContainerWithMargins: Story = {
  name: '📦 Template 2 - Container with Margins',
  args: createBaseProps({ 
    template: 2,
    props: createPhotoData(80, MOCK_PHOTOS.business, 10, {
      r: 8,
      marginL: 3,
      marginR: 3,
      marginT: 3,
      marginB: 3,
    }),
  }),
  render: (args) => (
    <StoryContainer title="Photo with background container and custom margins">
      <UserPhoto {...args} />
    </StoryContainer>
  ),
};

/**
 * Template 3 - Photo with shadow/background effect
 */
export const Template3_ShadowEffect: Story = {
  name: '🌟 Template 3 - Shadow Effect',
  args: createBaseProps({ 
    template: 3,
    props: createPhotoData(80, MOCK_PHOTOS.creative, 10, { r: 8 }),
    bg: COLOR_PALETTE.dark,
  }),
  render: (args) => (
    <StoryContainer title="Photo with layered shadow/background effect">
      <UserPhoto {...args} />
    </StoryContainer>
  ),
};

/**
 * Template 4 - Circular photo
 */
export const Template4_Circular: Story = {
  name: '⭕ Template 4 - Circular',
  args: createBaseProps({ 
    template: 4,
    props: createPhotoData(80, MOCK_PHOTOS.casual, 10),
    bg: COLOR_PALETTE.success,
  }),
  render: (args) => (
    <StoryContainer title="Circular photo with 50% border radius">
      <UserPhoto {...args} />
    </StoryContainer>
  ),
};

/**
 * Template 5 - Circular with semi-transparent border
 */
export const Template5_CircularWithBorder: Story = {
  name: '🔘 Template 5 - Circular with Border',
  args: createBaseProps({ 
    template: 5,
    props: createPhotoData(80, MOCK_PHOTOS.corporate, 10),
    bg: COLOR_PALETTE.info,
  }),
  render: (args) => (
    <StoryContainer title="Circular photo with semi-transparent border">
      <UserPhoto {...args} />
    </StoryContainer>
  ),
};

// ============================================================================
// COMPARISON AND SHOWCASE STORIES
// ============================================================================

/**
 * Side-by-side comparison of all templates
 */
export const AllTemplatesComparison: Story = {
  name: '🔄 All Templates Comparison',
  render: () => {
    const templates: UserPhotoTemplate[] = [1, 2, 3, 4, 5];
    const templateNames = [
      'Basic Rectangle',
      'Container + Margins', 
      'Shadow Effect',
      'Circular',
      'Circular + Border'
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          UserPhoto Template Variations
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {templates.map((template, index) => (
            <div key={template} style={{ textAlign: 'center' }}>
              <StoryContainer width={180} height={140}>
                <UserPhoto
                  fac={1}
                  props={createPhotoData(70, Object.values(MOCK_PHOTOS)[index], 10, {
                    r: 6,
                    marginL: 2,
                    marginR: 2,
                    marginT: 2,
                    marginB: 2,
                  })}
                  bg={Object.values(COLOR_PALETTE)[index]}
                  font="#333333"
                  template={template}
                />
              </StoryContainer>
              <div style={{ marginTop: '8px' }}>
                <strong>Template {template}</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {templateNames[index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Responsive scaling demonstration
 */
export const ResponsiveScaling: Story = {
  name: '📏 Responsive Scaling (fac)',
  render: () => {
    const scaleFactors = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Scaling Factor Demonstration (fac)
        </h3>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Shows how the fac prop scales all dimensions proportionally
        </p>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: '20px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {scaleFactors.map((fac) => (
            <div key={fac} style={{ textAlign: 'center' }}>
              <StoryContainer 
                width={Math.max(120, 80 * fac)} 
                height={Math.max(100, 80 * fac)}
              >
                <UserPhoto
                  fac={fac}
                  props={createPhotoData(60, MOCK_PHOTOS.professional, 8, { r: 6 })}
                  bg={COLOR_PALETTE.primary}
                  font="#333333"
                  template={3}
                />
              </StoryContainer>
              <div style={{ marginTop: '8px' }}>
                <strong>fac: {fac}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ============================================================================
// TESTING AND EDGE CASE STORIES
// ============================================================================

/**
 * Error handling and edge cases
 */
export const ErrorHandlingAndEdgeCases: Story = {
  name: '🔧 Error Handling & Edge Cases',
  render: () => {
    const testCases = [
      {
        name: 'Missing Photo',
        props: createBaseProps({ 
          props: createPhotoData(80, '', 10) 
        }),
      },
      {
        name: 'Invalid Photo URL',
        props: createBaseProps({ 
          props: createPhotoData(80, 'https://invalid-url-404.jpg', 10) 
        }),
      },
      {
        name: 'Minimum Size',
        props: createBaseProps({ 
          fac: 0.3,
          props: createPhotoData(20, MOCK_PHOTOS.professional, 5) 
        }),
      },
      {
        name: 'Maximum Size',
        props: createBaseProps({ 
          fac: 2.5,
          props: createPhotoData(120, MOCK_PHOTOS.business, 5) 
        }),
      },
      {
        name: 'Large Margins',
        props: createBaseProps({ 
          template: 2,
          props: createPhotoData(80, MOCK_PHOTOS.creative, 10, {
            marginL: 20,
            marginR: 15,
            marginT: 25,
            marginB: 10,
          })
        }),
      },
      {
        name: 'Invalid Template',
        props: createBaseProps({ 
          template: 99 as UserPhotoTemplate // Invalid template number
        }),
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Error Handling & Edge Cases
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {testCases.map((testCase, index) => (
            <div key={index}>
              <StoryContainer title={testCase.name} width={220} height={160}>
                <UserPhoto {...testCase.props} />
              </StoryContainer>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Accessibility and high contrast testing
 */
export const AccessibilityTesting: Story = {
  name: '♿ Accessibility & High Contrast',
  render: () => {
    const contrastTests = [
      { 
        name: 'High Contrast Black', 
        bg: '#000000', 
        containerBg: '#ffffff' 
      },
      { 
        name: 'High Contrast White', 
        bg: '#ffffff', 
        containerBg: '#000000' 
      },
      { 
        name: 'High Contrast Blue', 
        bg: '#0066cc', 
        containerBg: '#ffffff' 
      },
      { 
        name: 'High Contrast Orange', 
        bg: '#ff6600', 
        containerBg: '#000000' 
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Accessibility & High Contrast Testing
        </h3>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Testing component visibility with high contrast color combinations
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px' 
        }}>
          {contrastTests.map((test, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '180px',
                  height: '140px',
                  border: '2px solid #666',
                  borderRadius: '4px',
                  backgroundColor: test.containerBg,
                  margin: '0 auto 12px',
                  overflow: 'hidden'
                }}
              >
                <UserPhoto
                  fac={1}
                  props={createPhotoData(70, MOCK_PHOTOS.business, 10)}
                  bg={test.bg}
                  font="#333333"
                  template={5}
                />
              </div>
              <strong>{test.name}</strong>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Performance testing with multiple instances
 */
export const PerformanceStressTest: Story = {
  name: '⚡ Performance Stress Test',
  render: () => {
    const instances = Array.from({ length: 36 }, (_, i) => ({
      id: `perf-photo-${i}`,
      template: ((i % 5) + 1) as UserPhotoTemplate,
      photo: Object.values(MOCK_PHOTOS)[i % Object.keys(MOCK_PHOTOS).length],
      color: Object.values(COLOR_PALETTE)[i % Object.keys(COLOR_PALETTE).length],
      fac: 0.8 + (i % 3) * 0.2, // Varying scales: 0.8, 1.0, 1.2
    }));

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Performance Stress Test
        </h3>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          36 UserPhoto instances with different templates, scales, and photos
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
          gap: '12px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {instances.map((instance, index) => (
            <div key={instance.id} style={{ textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '90px',
                  height: '90px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  backgroundColor: '#fafafa',
                  marginBottom: '4px',
                  overflow: 'hidden'
                }}
              >
                <UserPhoto
                  fac={instance.fac}
                  props={createPhotoData(60, instance.photo, 5, { r: 4 })}
                  bg={instance.color}
                  font="#333"
                  template={instance.template}
                  id={instance.id}
                />
              </div>
              <div style={{ fontSize: '10px', color: '#999' }}>
                T{instance.template}
              </div>
            </div>
          ))}
        </div>
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          padding: '16px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '6px',
          color: '#666'
        }}>
          💡 This test helps identify performance bottlenecks with multiple component instances.
          All components should render smoothly without frame drops.
        </div>
      </div>
    );
  },
};

// ============================================================================
// PRESET DEMONSTRATION STORIES
// ============================================================================

/**
 * Photo presets demonstration
 */
export const PhotoPresetsDemo: Story = {
  name: '🎨 Photo Presets Demo',
  render: () => {
    const presetDemos = [
      { name: 'Small', preset: PhotoPresets.small(MOCK_PHOTOS.professional) },
      { name: 'Medium', preset: PhotoPresets.medium(MOCK_PHOTOS.business) },
      { name: 'Large', preset: PhotoPresets.large(MOCK_PHOTOS.creative) },
      { name: 'With Border', preset: PhotoPresets.withBorder(MOCK_PHOTOS.casual, 0, 12) },
      { name: 'With Margins', preset: PhotoPresets.withMargins(MOCK_PHOTOS.corporate, 0, 8) },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          Photo Presets Demonstration
        </h3>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Convenient preset functions for common photo configurations
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          justifyContent: 'center',
          flexWrap: 'wrap' 
        }}>
          {presetDemos.map((demo, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <StoryContainer 
                title={demo.name}
                width={160}
                height={demo.preset.height + 40}
              >
                <UserPhoto
                  fac={1}
                  props={demo.preset}
                  bg={Object.values(COLOR_PALETTE)[index % Object.keys(COLOR_PALETTE).length]}
                  font="#333333"
                  template={index === 3 ? 2 : index === 4 ? 2 : 1}
                />
              </StoryContainer>
            </div>
          ))}
        </div>
        <div style={{ 
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#e3f2fd',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#1976d2'
        }}>
          <strong>Usage:</strong>
          <pre style={{ margin: '8px 0', fontFamily: 'monospace', fontSize: '12px' }}>
{`// Using presets
const smallPhoto = PhotoPresets.small("photo.jpg");
const mediumPhoto = PhotoPresets.medium("photo.jpg");
const borderPhoto = PhotoPresets.withBorder("photo.jpg", 0, 8);`}
          </pre>
        </div>
      </div>
    );
  },
};