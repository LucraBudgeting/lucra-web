import { Meta, StoryObj } from '@storybook/react';
import { CategoryList } from '@/components/category/CategoryList';

const meta = {
  title: 'modal/Category/List',
  component: CategoryList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    incomes: [
      {
        label: 'Eating Out',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🍔',
          backgroundColor: '#FDF9A9',
        },
        id: '1',
      },
      {
        label: 'Car Payment',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🚗',
          backgroundColor: '#FDF9A9',
        },
        id: '2',
      },
      {
        label: 'Groceries',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🛒',
          backgroundColor: '#FDF9A9',
        },
        id: '3',
      },
      {
        label: 'Eating Out',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🍔',
          backgroundColor: '#FDF9A9',
        },
        id: '4',
      },
      {
        label: 'Car Payment',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🚗',
          backgroundColor: '#FDF9A9',
        },
        id: '5',
      },
      {
        label: 'Groceries',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🛒',
          backgroundColor: '#FDF9A9',
        },
        id: '6',
      },
    ],
    expenses: [
      {
        label: 'Eating Out',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🍔',
          backgroundColor: '#FDF9A9',
        },
        id: '1',
      },
      {
        label: 'Car Payment',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🚗',
          backgroundColor: '#FDF9A9',
        },
        id: '2',
      },
      {
        label: 'Groceries',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🛒',
          backgroundColor: '#FDF9A9',
        },
        id: '3',
      },
      {
        label: 'Eating Out',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🍔',
          backgroundColor: '#FDF9A9',
        },
        id: '4',
      },
      {
        label: 'Car Payment',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🚗',
          backgroundColor: '#FDF9A9',
        },
        id: '5',
      },
      {
        label: 'Groceries',
        budgetType: 'debit',
        amount: 0,
        avatar: {
          emoji: '🛒',
          backgroundColor: '#FDF9A9',
        },
        id: '6',
      },
    ],
  },
};
