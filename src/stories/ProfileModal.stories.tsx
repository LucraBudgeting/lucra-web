import { ProfileModal } from '@/components/profile/ProfileModal';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'modal/Profile',
  component: ProfileModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
