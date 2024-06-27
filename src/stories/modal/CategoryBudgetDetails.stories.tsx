import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CategoryBudgetDetails } from '@/components/dialog/CategoryBudgetDetails';

const meta = {
  title: 'modal/Category/BudgetDetails',
  component: CategoryBudgetDetails,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    closeCb: fn(),
    editCb: fn(),
  },
} satisfies Meta<typeof CategoryBudgetDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: {
      label: 'Eating Out',
      avatar: {
        emoji: '🍔',
        backgroundColor: '#FDF9A9',
      },
      id: '1',
    },
    budgeted: 0,
    actual: 0,
    budgetType: 'debit',
  },
};

export const Debit: Story = {
  args: {
    category: {
      label: 'Income',
      avatar: {
        emoji: '💰',
        backgroundColor: '#f5f5f5',
      },
      id: '1',
    },
    budgeted: 1000,
    actual: 1250,
    budgetType: 'debit',
  },
};

export const Credit: Story = {
  args: {
    category: {
      label: 'Eating Out',
      avatar: {
        emoji: '🍔',
        backgroundColor: '#f5f5f5',
      },
      id: '1',
    },
    budgeted: 1000,
    actual: 1500,
    budgetType: 'credit',
  },
};
