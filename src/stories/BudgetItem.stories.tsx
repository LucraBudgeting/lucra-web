import type { Meta, StoryObj } from '@storybook/react';
import { BudgetItem } from '@/components/budget/BudgetItem';
import { ParentContainer } from './ParentContainer';

const meta = {
  title: 'budget/BudgetItem',
  component: BudgetItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(story) => <ParentContainer width="800px">{story()}</ParentContainer>],
} satisfies Meta<typeof BudgetItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar: {
      emoji: '💰',
      backgroundColor: '#24e90a',
    },
    title: 'Salary',
    budgeted: 4000,
    actual: 4500,
    budgetType: 'debit',
  },
};

export const CreditNoRemaining: Story = {
  args: {
    avatar: {
      emoji: '🏠',
      backgroundColor: '#10e3b9',
    },
    title: 'Mortgage',
    budgeted: 4000,
    actual: 4500,
    budgetType: 'credit',
  },
};

export const CreditRemaining: Story = {
  args: {
    avatar: {
      emoji: '🍔',
      backgroundColor: '#f10dad',
    },
    title: 'Eating Out',
    budgeted: 4000,
    actual: 3500,
    budgetType: 'credit',
  },
};

export const DebitNoRemaining: Story = {
  args: {
    avatar: {
      emoji: '🤑',
      backgroundColor: '#2eaf4a',
    },
    title: 'Rent Income',
    budgeted: 4000,
    actual: 3500,
    budgetType: 'debit',
  },
};

export const DebitRemaining: Story = {
  args: {
    avatar: {
      emoji: '🍔',
      backgroundColor: '#FDF9A9',
    },
    title: 'Salary',
    budgeted: 4000,
    actual: 4500,
    budgetType: 'debit',
  },
};
