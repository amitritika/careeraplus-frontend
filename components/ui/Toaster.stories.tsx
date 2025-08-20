import type { Meta, StoryObj } from '@storybook/react';
import Toaster from './Toaster';
import { ToastProvider, useToast } from '../providers/ToastProvider';

function Demo() {
  const { show } = useToast();
  return (
    <div className="space-x-2">
      <button className="rounded bg-emerald-600 px-3 py-1 text-white" onClick={()=>show({ type: 'success', title: 'Saved', description: 'Changes stored.'})}>Success</button>
      <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={()=>show({ type: 'error', title: 'Oops', description: 'Something went wrong.'})}>Error</button>
      <button className="rounded bg-slate-700 px-3 py-1 text-white" onClick={()=>show({ type: 'info', title: 'Heads up', description: 'Just so you know.'})}>Info</button>
    </div>
  );
}

const meta: Meta<typeof Toaster> = {
  title: 'UI/Toaster',
  component: Toaster,
  decorators: [(Story) => (<ToastProvider><Toaster /><Story /></ToastProvider>)]
};
export default meta;
type Story = StoryObj<typeof Toaster>;
export const Default: Story = {};
