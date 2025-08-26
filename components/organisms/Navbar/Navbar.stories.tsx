// components/organisms/Navbar/Navbar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Navbar from './Navbar';

function setFetchMock(profileResponse: any) {
  const original = window.fetch;
  // mock synchronously before first render
  (window as any).fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : (input as Request).url;

    if (url.includes('/api/user/profile')) {
      return new Response(JSON.stringify(profileResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (url.includes('/api/auth/signout')) {
      return new Response(JSON.stringify({ message: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return original(input as any, init);
  };
  // return a cleanup if you ever need it
  return () => (window.fetch = original);
}

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-2xl border border-black/10 bg-white p-8">
            <p className="text-slate-600">Content below the sticky navbar.</p>
            <div className="mt-6 h-[50vh] rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const LoggedOut: Story = {
  name: 'Logged out (role=null)',
  render: () => {
    setFetchMock({ user: { role: null } });
    return <Navbar key="role-null" />;
  },
};

export const User: Story = {
  name: 'User (role=0)',
  render: () => {
    setFetchMock({ user: { username: 'amit', name: 'Amit', email: 'a@b.c', role: 0 } });
    return <Navbar key="role-0" />;
  },
};

export const Admin: Story = {
  name: 'Admin (role=1)',
  render: () => {
    setFetchMock({ user: { username: 'admin', name: 'Admin', email: 'admin@site.c', role: 1 } });
    return <Navbar key="role-1" />;
  },
};
