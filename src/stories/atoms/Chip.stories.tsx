import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Chip } from '@/atoms/chip/Chip';

const meta = {
  title: 'atom/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    emoji: { control: 'text' },
    label: { control: 'text' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Eating Out',
    emoji: '🍔',
  },
};

export const WithoutEmoji: Story = {
  args: {
    label: 'Eating Out',
  },
};
