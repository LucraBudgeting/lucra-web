import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AddCategoryChip } from '@/components/chip/AddCategoryChip';

const meta = {
  title: 'basic/Chip/AddCategory',
  component: AddCategoryChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof AddCategoryChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
