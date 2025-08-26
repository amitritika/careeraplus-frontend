import type { Meta, StoryObj } from '@storybook/react';
import DashboardLayout from '.';   // ⬅️ from folder index

import Card from '@/components/molecules/Card';
import Button from '@/components/atoms/Button';

const meta = { title: 'Templates/DashboardLayout', component: DashboardLayout } satisfies Meta<typeof DashboardLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithCards: Story = {
  args: {
    children: (
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Stats" actions={<Button size="sm">Refresh</Button>}>
          <p className="text-sm">Users, sessions, conversions…</p>
        </Card>
        <Card title="Recent Activity">
          <ul className="text-sm space-y-2">
            <li>• User signed up</li>
            <li>• Profile updated</li>
            <li>• Admin created a tag</li>
          </ul>
        </Card>
        <Card title="Notes"><p className="text-sm">Replace with your widgets.</p></Card>
      </div>
    )
  }
};
