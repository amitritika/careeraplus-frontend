// .storybook/AliasProbe.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToastProvider } from '@/components/providers/ToastProvider';

const meta: Meta = { title: '⚙️ Diagnostics/AliasProbe' };
export default meta;
type Story = StoryObj;

export const Probe: Story = { render: () => <ToastProvider>Alias OK</ToastProvider> };
