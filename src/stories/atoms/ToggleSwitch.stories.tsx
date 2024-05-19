import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ToggleSwitch from '@/atoms/toggle/ToggleSwitch';

const meta = {
  title: 'atom/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onToggle: fn() },
} satisfies Meta<typeof ToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['Income', 'Expense'],
  },
};

export const ManyOptions: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const TwoOptions: Story = {
  args: {
    options: ['Income', 'Expense'],
  },
};

export const DefaultIndex: Story = {
  args: {
    options: ['Income', 'Expense'],
    defaultValue: 'Expense',
  },
};
