import type { Meta, StoryObj } from '@storybook/react';
import { AvatarEmoji } from '@/atoms/avatar/AvatarEmoji';

const meta = {
  title: 'atom/Avatar/AvatarEmoji',
  component: AvatarEmoji,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarEmoji>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    emoji: '🚗',
    backgroundColor: '#FDF9A9',
  },
};

export const Small: Story = {
  args: {
    emoji: '🚗',
    backgroundColor: '#FDF9A9',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    emoji: '🚗',
    backgroundColor: '#FDF9A9',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    emoji: '🚗',
    backgroundColor: '#FDF9A9',
    size: 'lg',
  },
};
