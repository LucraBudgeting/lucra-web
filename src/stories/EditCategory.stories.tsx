import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditCategory } from '@/components/dialog/EditCategory';

const meta = {
  title: 'modal/Category/EditCategory',
  component: EditCategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    closeCb: fn(),
    editCb: fn(),
  },
} satisfies Meta<typeof EditCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: {
      label: 'Eating Out',
      emoji: '🍔',
      backgroundColor: '#FDF9A9',
      id: '1',
    },
    budgeted: 100,
  },
};
