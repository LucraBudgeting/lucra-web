import { Meta, StoryObj } from '@storybook/react';
import { SettingModal } from '@/components/profile/ProfileModal';

const meta = {
  title: 'modal/Profile',
  component: SettingModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
