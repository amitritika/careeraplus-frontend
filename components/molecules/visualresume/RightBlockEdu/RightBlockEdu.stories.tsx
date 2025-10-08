import type { Meta, StoryObj } from '@storybook/react';
import RightBlockEdu, { RightBlockEduProps } from './RightBlockEdu';

const meta: Meta<RightBlockEduProps> = {
  title: 'Resume/RightBlockEdu',
  component: RightBlockEdu,
  argTypes: {
    fac:        { control: { type: 'range', min: 0.5, max: 2, step: 0.1 } },
    template:   { control: { type: 'select', options: [1, 2, 3, 4, 5] } },
    bg:         { control: 'color' },
    font:       { control: 'color' },
    fontFamily: { control: 'text' },
    id:         { control: 'text' },
    className:  { control: 'text' }
  }
};
export default meta;

type Story = StoryObj<RightBlockEduProps>;

const sample = {
  data: {
    degree: 'B.Tech Computer Science',
    college: 'ABC University',
    year: '2024',
    cgpa: '9.2/10'
  } as const,
  height: 40,
  top: 0
};

export const Template1: Story = { args: { ...sample, template: 1 } };
export const Template2: Story = { args: { ...sample, template: 2, line: true } };
export const Template3: Story = { args: { ...sample, template: 3, line: true } };
export const Template4: Story = { args: { ...sample, template: 4 } };
export const Template5: Story = { args: { ...sample, template: 5 } };

export const InteractiveControls: Story = {
  args: { ...sample }
};

export const TemplateShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[1, 2, 3, 4, 5].map(t => (
        <RightBlockEdu
          key={t}
          {...sample}
          template={t as 1}
          top={t * 50}
          line
        />
      ))}
    </div>
  )
};

export const ResponsiveScaling: Story = {
  render: () => (
    <>
      {[0.75, 1, 1.25, 1.5].map(f => (
        <RightBlockEdu key={f} {...sample} fac={f} template={1} />
      ))}
    </>
  )
};

export const AccessibilityHighContrast: Story = {
  args: { ...sample, bg: '#000', font: '#FFF', template: 1 }
};

export const EdgeCases: Story = {
  args: {
    ...sample,
    template: 5,
    height: 80,
    data: {
      ...sample.data,
      degree:
        'Super-Long Degree Name Exceeding Normal Length To Test Layout Overflow'
    }
  }
};

export const PropsValidation: Story = {
  args: { data: sample.data }
};
