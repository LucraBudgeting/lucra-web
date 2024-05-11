import { CategoryBudgetDetails } from '@/components/dialog/CategoryBudgetDetails';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'modal/Category/BudgetDetails',
  component: CategoryBudgetDetails,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryBudgetDetails>;

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
    budgeted: 0,
    actual: 0,
    budgetType: 'debit',
    closeCb: fn(),
  },
};

export const Debit: Story = {
  args: {
    category: {
      label: 'Income',
      emoji: '💰',
      backgroundColor: '#f5f5f5',
      id: '1',
    },
    budgeted: 1000,
    actual: 1250,
    budgetType: 'debit',
    closeCb: fn(),
  },
};

export const Credit: Story = {
  args: {
    category: {
      label: 'Eating Out',
      emoji: '🍔',
      backgroundColor: '#f5f5f5',
      id: '1',
    },
    budgeted: 1000,
    actual: 1500,
    budgetType: 'credit',
    closeCb: fn(),
  },
};
