import type { Meta, StoryObj } from '@storybook/react';
import LeftBlockSkill from './LeftBlockSkill';
import type { LeftBlockSkillProps, SkillData } from './LeftBlockSkill';

/**
 * Mock skill data for testing
 */
const mockSkillData: SkillData = {
  name: 'TypeScript',
  rating: 85,
  top: 0
};

const advancedSkillData: SkillData = {
  name: 'React Development',
  rating: 92,
  top: 2
};

const beginnerSkillData: SkillData = {
  name: 'Docker',
  rating: 45,
  top: 1
};

const meta: Meta<typeof LeftBlockSkill> = {
  title: 'Components/LeftBlockSkill',
  component: LeftBlockSkill,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A consolidated skill display component supporting 5 different template styles with progress bars and star ratings.'
      }
    }
  },
  argTypes: {
    fac: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Scaling factor for all dimensions'
    },
    template: {
      control: { type: 'select', options: [1, 2, 3, 4, 5] },
      description: 'Template style variant'
    },
    bg: {
      control: { type: 'color' },
      description: 'Background/accent color'
    },
    font: {
      control: { type: 'color' },
      description: 'Font/text color'
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family override'
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
type Story = StoryObj<typeof LeftBlockSkill>;

/**
 * Interactive controls story with top-level props only
 */
export const Interactive: Story = {
  args: {
    fac: 1.2,
    template: 1,
    props: mockSkillData,
    bg: 'rgb(74, 144, 226)',
    font: 'rgb(255, 255, 255)',
    fontFamily: 'calibri',
    id: 'skill-interactive',
    className: ''
  }
};

/**
 * Template 1: Simple Progress Bar
 */
export const Template1: Story = {
  args: {
    fac: 1.0,
    template: 1,
    props: mockSkillData,
    bg: 'rgb(74, 144, 226)',
    font: 'rgb(33, 150, 243)',
    id: 'skill-template-1'
  }
};

/**
 * Template 2: Rounded Progress Bar
 */
export const Template2: Story = {
  args: {
    fac: 1.0,
    template: 2,
    props: advancedSkillData,
    bg: 'rgb(76, 175, 80)',
    font: 'rgb(255, 255, 255)',
    id: 'skill-template-2'
  }
};

/**
 * Template 3: Star Rating (Background Color)
 */
export const Template3: Story = {
  args: {
    fac: 1.0,
    template: 3,
    props: { ...mockSkillData, rating: 75 }, // Will be normalized to ~3.75 stars
    bg: 'rgb(255, 193, 7)',
    font: 'rgb(33, 33, 33)',
    id: 'skill-template-3'
  }
};

/**
 * Template 4: Star Rating (White Icons)
 */
export const Template4: Story = {
  args: {
    fac: 1.0,
    template: 4,
    props: { ...advancedSkillData, rating: 88 }, // Will be normalized to ~4.4 stars
    bg: 'rgb(233, 30, 99)',
    font: 'rgb(255, 255, 255)',
    id: 'skill-template-4'
  }
};

/**
 * Template 5: Transparent Progress Bar
 */
export const Template5: Story = {
  args: {
    fac: 1.0,
    template: 5,
    props: beginnerSkillData,
    bg: 'rgb(158, 158, 158)',
    font: 'rgb(97, 97, 97)',
    id: 'skill-template-5'
  }
};

/**
 * Template Showcase - Side by Side Comparison
 */
export const TemplateShowcase: Story = {
  render: () => {
    const showcaseSkills: SkillData[] = [
      { name: 'JavaScript', rating: 90, top: 0 },
      { name: 'CSS/SCSS', rating: 78, top: 0 },
      { name: 'Node.js', rating: 65, top: 0 },
      { name: 'MongoDB', rating: 82, top: 0 },
      { name: 'Git/GitHub', rating: 88, top: 0 }
    ];

    const colors = [
      { bg: 'rgb(255, 193, 7)', font: 'rgb(33, 33, 33)' },
      { bg: 'rgb(74, 144, 226)', font: 'rgb(255, 255, 255)' },
      { bg: 'rgb(76, 175, 80)', font: 'rgb(255, 255, 255)' },
      { bg: 'rgb(233, 30, 99)', font: 'rgb(255, 255, 255)' },
      { bg: 'rgb(158, 158, 158)', font: 'rgb(97, 97, 97)' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h3>All Template Variations</h3>
        {[1, 2, 3, 4, 5].map((template, index) => (
          <div key={template} style={{ position: 'relative', height: '20px', marginBottom: '10px' }}>
            <LeftBlockSkill
              fac={1.2}
              template={template as 1 | 2 | 3 | 4 | 5}
              props={showcaseSkills[index]}
              bg={colors[index].bg}
              font={colors[index].font}
              id={`showcase-template-${template}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Responsive Scaling Demo
 */
export const ResponsiveScaling: Story = {
  render: () => {
    const scalingSizes = [0.8, 1.0, 1.2, 1.5, 2.0];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
        <h3>Responsive Scaling (fac: 0.8 - 2.0)</h3>
        {scalingSizes.map(scale => (
          <div key={scale} style={{ position: 'relative', height: `${scale * 20}px`, marginBottom: '5px' }}>
            <LeftBlockSkill
              fac={scale}
              template={2}
              props={{ name: `Scale ${scale}x`, rating: 75, top: 0 }}
              bg="rgb(74, 144, 226)"
              font="rgb(255, 255, 255)"
              id={`scaling-${scale}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Accessibility Testing
 */
export const AccessibilityTest: Story = {
  render: () => {
    const accessibilityVariants = [
      { 
        name: 'High Contrast', 
        bg: 'rgb(0, 0, 0)', 
        font: 'rgb(255, 255, 255)',
        skill: { name: 'High Contrast Design', rating: 88, top: 0 }
      },
      { 
        name: 'Large Text', 
        bg: 'rgb(74, 144, 226)', 
        font: 'rgb(255, 255, 255)',
        skill: { name: 'Accessibility Features', rating: 92, top: 0 },
        fac: 2.0
      },
      { 
        name: 'Color Blind Safe', 
        bg: 'rgb(0, 114, 178)', 
        font: 'rgb(255, 255, 255)',
        skill: { name: 'Color Blind Friendly', rating: 85, top: 0 }
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', padding: '20px' }}>
        <h3>Accessibility Variants</h3>
        {accessibilityVariants.map((variant, index) => (
          <div key={index} style={{ position: 'relative', height: `${(variant.fac || 1.2) * 20}px` }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>{variant.name}</h4>
            <LeftBlockSkill
              fac={variant.fac || 1.2}
              template={1}
              props={variant.skill}
              bg={variant.bg}
              font={variant.font}
              id={`accessibility-${index}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Edge Cases Testing
 */
export const EdgeCases: Story = {
  render: () => {
    const edgeCases = [
      { name: 'Very Long Skill Name That Might Overflow', rating: 100, top: 0 },
      { name: 'Min Rating', rating: 0, top: 0 },
      { name: 'Max Rating', rating: 100, top: 0 },
      { name: 'Half Star Edge', rating: 47, top: 0 }, // Should show 2.35 stars
      { name: 'A', rating: 50, top: 0 } // Single character
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h3>Edge Case Testing</h3>
        {edgeCases.map((skill, index) => (
          <div key={index} style={{ position: 'relative', height: '25px', marginBottom: '5px' }}>
            <LeftBlockSkill
              fac={1.0}
              template={index % 2 === 0 ? 1 : 3}
              props={skill}
              bg="rgb(74, 144, 226)"
              font="rgb(255, 255, 255)"
              id={`edge-case-${index}`}
            />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Props Validation Demo
 */
export const PropsValidation: Story = {
  render: () => {
    const validationTests = [
      {
        title: 'Default Values',
        props: {
          fac: 1.0,
          template: 1 as const,
          props: { name: 'Default Test', rating: 75, top: 0 },
          bg: 'rgb(74, 144, 226)',
          font: 'rgb(255, 255, 255)',
          id: 'validation-default'
        }
      },
      {
        title: 'Custom Font Family',
        props: {
          fac: 1.0,
          template: 2 as const,
          props: { name: 'Custom Font', rating: 80, top: 0 },
          bg: 'rgb(76, 175, 80)',
          font: 'rgb(255, 255, 255)',
          fontFamily: 'Arial, sans-serif',
          id: 'validation-font'
        }
      },
      {
        title: 'With CSS Class',
        props: {
          fac: 1.0,
          template: 3 as const,
          props: { name: 'CSS Class Test', rating: 70, top: 0 },
          bg: 'rgb(255, 193, 7)',
          font: 'rgb(33, 33, 33)',
          className: 'custom-skill-class',
          id: 'validation-class'
        }
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h3>Props Validation Tests</h3>
        {validationTests.map((test, index) => (
          <div key={index} style={{ position: 'relative', height: '25px', marginBottom: '5px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#666' }}>{test.title}</h4>
            <LeftBlockSkill {...test.props} />
          </div>
        ))}
      </div>
    );
  }
};
