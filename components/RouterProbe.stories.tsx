import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const meta: Meta = { title: '⚙️ Diagnostics/RouterProbe', parameters: { nextjs: { appDirectory: true } } };
export default meta;
type Story = StoryObj;

export const Probe: Story = {
  render: () => {
    const r = useRouter(); // should NOT throw
    const p = usePathname();
    return <pre>Router OK. pathname: {p}</pre>;
  },
};