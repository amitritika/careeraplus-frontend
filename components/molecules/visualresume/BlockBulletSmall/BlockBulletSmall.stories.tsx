/**
 * Storybook Stories for BlockBulletSmall Component with FontFamily Support
 * Enhanced with React Icons, html-react-parser, and configurable font families
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BlockBulletSmall } from './BlockBulletSmall';
import type { BlockBulletSmallProps } from './BlockBulletSmall';

const meta: Meta<typeof BlockBulletSmall> = {
  title: 'Components/BlockBulletSmall (Final)',
  component: BlockBulletSmall,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# BlockBulletSmall - Complete Implementation

A fully featured, consolidated bullet point component with:
- ✅ **React Icons**: FaCheck and FaCircle components
- ✅ **HTML Parser**: Safe HTML parsing with html-react-parser  
- ✅ **FontFamily Support**: Configurable font families
- ✅ **TypeScript**: Full type safety and IntelliSense
- ✅ **Performance**: Tree-shaking and optimized rendering
- ✅ **Security**: No dangerouslySetInnerHTML

## Dependencies Required
\`\`\`bash
npm install react-icons html-react-parser
\`\`\`

## Font Family Options
- Arial, sans-serif
- Helvetica, sans-serif  
- Times New Roman, serif
- Georgia, serif
- Calibri (default)
- Verdana, sans-serif
- And any custom font family
        `
      }
    }
  },
  argTypes: {
    template: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Template variation (1-5)',
      table: {
        type: { summary: '1 | 2 | 3 | 4 | 5' },
        defaultValue: { summary: '1' }
      }
    },
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions',
      table: {
        type: { summary: 'number' }
      }
    },
    bg: {
      control: 'color',
      description: 'Background/bullet color',
      table: {
        type: { summary: 'string' }
      }
    },
    font: {
      control: 'color',
      description: 'Font color',
      table: {
        type: { summary: 'string' }
      }
    },
    fontFamily: {
      control: { type: 'select' },
      options: [
        'calibri',
        'Arial, sans-serif',
        'Helvetica, sans-serif', 
        'Times New Roman, serif',
        'Georgia, serif',
        'Verdana, sans-serif',
        'Courier New, monospace',
        'Impact, sans-serif',
        'Trebuchet MS, sans-serif',
        'Comic Sans MS, cursive'
      ],
      description: 'Font family for text rendering',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'calibri' }
      }
    },
    id: {
      control: 'text',
      description: 'Unique component identifier'
    },
    props: {
      description: 'Template-specific properties object',
      control: false
    }
  },
  args: {
    template: 1,
    fac: 1,
    bg: '#2563eb',
    font: '#1f2937',
    fontFamily: 'calibri',
    id: 'bullet-story',
    props: {
      height: 20,
      name: '<strong>Font Family Integration</strong><br/>Configurable typography with React Icons',
      top: 0,
      line: true
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function for consistent props
const createBaseProps = (overrides: Partial<BlockBulletSmallProps> = {}): BlockBulletSmallProps => ({
  fac: 1,
  bg: '#2563eb',
  font: '#1f2937',
  fontFamily: 'calibri',
  id: 'bullet-story',
  template: 1,
  props: {
    height: 20,
    name: '<strong>Professional Experience</strong><br/>Senior React Developer with modern tooling',
    top: 0,
    line: true
  },
  ...overrides
});

// Font Family Showcase
export const FontFamilyShowcase: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
      <h2 style={{ marginBottom: '30px', fontFamily: 'Arial, sans-serif' }}>
        📝 Font Family Showcase
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {[
          { font: 'calibri', label: 'Calibri (Default)', template: 1 },
          { font: 'Arial, sans-serif', label: 'Arial Sans-Serif', template: 2 },
          { font: 'Times New Roman, serif', label: 'Times New Roman Serif', template: 3 },
          { font: 'Georgia, serif', label: 'Georgia Serif', template: 4 },
          { font: 'Verdana, sans-serif', label: 'Verdana Sans-Serif', template: 5 },
          { font: 'Courier New, monospace', label: 'Courier New Monospace', template: 1 },
          { font: 'Impact, sans-serif', label: 'Impact Sans-Serif', template: 2 },
          { font: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS', template: 3 }
        ].map(({ font, label, template }, index) => (
          <div key={index} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: 'white'
          }}>
            <h3 style={{ 
              fontSize: '14px', 
              color: '#6b7280', 
              marginBottom: '15px',
              fontFamily: 'Arial, sans-serif'
            }}>
              {label}
            </h3>
            <div style={{ position: 'relative', height: '60px', width: '350px' }}>
              <BlockBulletSmall
                {...createBaseProps({
                  template: template as 1 | 2 | 3 | 4 | 5,
                  fontFamily: font,
                  id: `font-showcase-${index}`,
                  props: {
                    height: 30,
                    name: `<strong>${label} Font</strong><br/>Typography demonstration`,
                    top: 0,
                    line: true
                  }
                })}
              />
            </div>
            <code style={{ 
              fontSize: '11px', 
              backgroundColor: '#f3f4f6', 
              padding: '6px 8px',
              borderRadius: '4px',
              display: 'block',
              marginTop: '10px',
              color: '#374151'
            }}>
              fontFamily: "{font}"
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    controls: { exclude: /.*/g }
  }
};

// Typography & Template Combinations
export const TypographyTemplates: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>🎨 Typography with Template Variations</h2>

      <div style={{ display: 'grid', gap: '40px', marginTop: '20px' }}>
        {[
          {
            title: 'Professional Resume Style',
            fontFamily: 'calibri',
            templates: [1, 2, 3, 4, 5],
            content: '<strong>Senior Software Engineer</strong><br/>Full-stack development expertise'
          },
          {
            title: 'Classic Document Style', 
            fontFamily: 'Times New Roman, serif',
            templates: [1, 3, 5],
            content: '<strong>Technical Publications</strong><br/>Academic research and development'
          },
          {
            title: 'Modern Sans-Serif Style',
            fontFamily: 'Arial, sans-serif', 
            templates: [2, 4],
            content: '<strong>Design Leadership</strong><br/>User experience and interface design'
          },
          {
            title: 'Clean Verdana Style',
            fontFamily: 'Verdana, sans-serif',
            templates: [1, 4, 5],
            content: '<strong>Project Management</strong><br/>Agile methodologies and team coordination'
          }
        ].map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 style={{ 
              color: '#1f2937',
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              {section.title}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {section.templates.map((template, templateIndex) => (
                <div key={templateIndex} style={{ 
                  border: '1px solid #e2e8f0', 
                  padding: '20px', 
                  borderRadius: '8px',
                  backgroundColor: 'white'
                }}>
                  <h4 style={{ 
                    fontSize: '12px', 
                    color: '#6b7280', 
                    marginBottom: '15px',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    Template {template} - {section.fontFamily}
                  </h4>
                  <div style={{ position: 'relative', height: '50px' }}>
                    <BlockBulletSmall
                      {...createBaseProps({
                        template: template as 1 | 2 | 3 | 4 | 5,
                        fontFamily: section.fontFamily,
                        id: `typography-${sectionIndex}-${templateIndex}`,
                        props: {
                          height: 25,
                          name: section.content,
                          top: 0,
                          line: true
                        }
                      })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    controls: { exclude: /.*/g }
  }
};

// Interactive Font Testing
export const InteractiveFontTest: Story = {
  args: createBaseProps(),
  parameters: {
    docs: {
      description: {
        story: `
### Interactive Font Family Testing

Use the **fontFamily** control in the Controls panel to test different font families in real-time:

- **calibri** - Default resume font
- **Arial, sans-serif** - Clean and professional
- **Times New Roman, serif** - Traditional and formal
- **Georgia, serif** - Elegant serif option
- **Verdana, sans-serif** - Highly readable
- **Courier New, monospace** - Code-style formatting
        `
      }
    }
  }
};

// All Templates with Font Families
export const AllTemplatesWithFonts: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
      <h2 style={{ marginBottom: '30px', fontFamily: 'Arial, sans-serif' }}>
        📋 All Templates with Different Font Families
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        {[
          { template: 1, title: 'Basic Bullet', font: 'calibri' },
          { template: 2, title: 'Bullet with Line', font: 'Arial, sans-serif' },
          { template: 3, title: 'FaCheck (Font Color)', font: 'Times New Roman, serif' },
          { template: 4, title: 'FaCheck (BG Color)', font: 'Georgia, serif' },
          { template: 5, title: 'FaCircle', font: 'Verdana, sans-serif' }
        ].map(({ template, title, font }) => (
          <div key={template} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {template}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1f2937' }}>{title}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                  Font: <code>{font}</code>
                </p>
              </div>
            </div>

            <div style={{ position: 'relative', height: '50px', width: '400px' }}>
              <BlockBulletSmall
                {...createBaseProps({
                  template: template as 1 | 2 | 3 | 4 | 5,
                  fontFamily: font,
                  id: `overview-font-${template}`,
                  props: {
                    height: 25,
                    name: `<strong>Template ${template} Demo</strong><br/>Font family: ${font}`,
                    top: 0,
                    line: true
                  }
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    controls: { exclude: /.*/g }
  }
};

// Individual template stories with font family support
export const Template1_Basic: Story = {
  args: createBaseProps({ template: 1, fontFamily: 'calibri' })
};

export const Template2_WithLine: Story = {
  args: createBaseProps({ template: 2, fontFamily: 'Arial, sans-serif' })
};

export const Template3_FaCheck_FontColor: Story = {
  args: createBaseProps({ template: 3, fontFamily: 'Times New Roman, serif' })
};

export const Template4_FaCheck_BGColor: Story = {
  args: createBaseProps({ template: 4, fontFamily: 'Georgia, serif' })
};

export const Template5_FaCircle: Story = {
  args: createBaseProps({ template: 5, fontFamily: 'Verdana, sans-serif' })
};

// Responsive Typography Test
export const ResponsiveTypography: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>📱 Responsive Typography Test</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {[0.8, 1, 1.2, 1.5, 2].map(scale => (
          <div key={scale} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>
              Scale: {scale}x
            </h4>

            <div style={{ display: 'grid', gap: '15px' }}>
              {['calibri', 'Arial, sans-serif', 'Times New Roman, serif'].map((font, fontIndex) => (
                <div key={fontIndex}>
                  <h5 style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 5px 0' }}>
                    {font}
                  </h5>
                  <div style={{ position: 'relative', height: `${40 * scale}px` }}>
                    <BlockBulletSmall
                      {...createBaseProps({
                        template: 3,
                        fac: scale,
                        fontFamily: font,
                        id: `responsive-${scale}-${fontIndex}`,
                        props: {
                          height: 25,
                          name: `<strong>Scale ${scale}x</strong><br/>${font}`,
                          top: 0,
                          line: true
                        }
                      })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    controls: { exclude: /.*/g }
  }
};
