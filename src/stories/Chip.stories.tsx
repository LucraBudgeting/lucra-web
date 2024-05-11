import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Chip } from '@/atoms/chip/Chip';

const meta = {
  title: 'basic/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    emoji: { control: 'text' },
    backgroundColor: { control: 'color' },
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
    backgroundColor: '#FDF9A9',
  },
};

export const WithoutEmoji: Story = {
  args: {
    label: 'Eating Out',
    backgroundColor: '#FDF9A9',
  },
};
