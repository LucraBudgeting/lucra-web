import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditOrAddCategory } from '@/components/dialog/EditOrAddCategory';

const meta = {
  title: 'modal/Category/EditOrAddCategory',
  component: EditOrAddCategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    closeCb: fn(),
  },
} satisfies Meta<typeof EditOrAddCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: {
      label: 'Eating Out',
      avatar: {
        emoji: '🍔',
        backgroundColor: '#49CCCB',
      },
      id: '1',
      amount: 0,
    },
    budgeted: 0,
    headerText: 'Edit Category',
    successCb: fn(),
  },
};

export const InitialAmount: Story = {
  args: {
    category: {
      label: 'Eating Out',
      avatar: {
        emoji: '🍔',
        backgroundColor: '#49CCCB',
      },
      id: '1',
      amount: 0,
    },
    budgeted: 4335,
    headerText: 'Edit Category',
  },
};

export const AddCategory: Story = {
  args: {
    headerText: 'Add Category',
    budgeted: 0,
    successCb: fn(),
  },
};
