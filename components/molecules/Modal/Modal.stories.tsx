import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import Button from '@/components/atoms/Button';
import { useState } from 'react';

const meta = { title: 'Molecules/Modal', component: Modal } satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    title: 'Example modal',
    onClose: () => {},
    children: (
      <>
        <p className="text-sm">Compose molecules & organisms for consistent UX.</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </>
    )
  }
};

export const Toggleable: Story = {
  args: { open: false, title: 'Interactive', onClose: () => {}, children: null },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} title="Interactive" onClose={() => setOpen(false)}>
          <p className="text-sm">This one can close.</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </div>
    );
  }
};
