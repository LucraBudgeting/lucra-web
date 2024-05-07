import type { Meta, StoryObj } from '@storybook/react';
import { TransactionList } from '@/components/transaction/TransactionList';
import { createShortGuid } from '@/utils/guid.helper';
import { ParentContainer } from './ParentContainer';

const meta = {
  title: 'transaction/TransactionList',
  component: TransactionList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(story) => <ParentContainer>{story()}</ParentContainer>],
} satisfies Meta<typeof TransactionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    transactions: [
      {
        category: {
          label: 'Eating Out',
          emoji: '🍔',
          backgroundColor: '#FDF9A9',
          id: createShortGuid(),
        },
        id: createShortGuid(),
        amount: -49.88,
        description: 'TST* Rodney Scotts BBQ',
        date: '2021-09-01',
      },
      {
        category: {
          label: 'Car Payment',
          emoji: '🚗',
          backgroundColor: '#FDF9A9',
          id: createShortGuid(),
        },
        id: createShortGuid(),
        amount: -409.88,
        description: 'Lindon Toyota',
        date: '2021-09-01',
      },
      {
        category: {
          label: 'Groceries',
          emoji: '🛒',
          backgroundColor: '#FDF9A9',
          id: createShortGuid(),
        },
        id: createShortGuid(),
        amount: -102.34,
        description: 'Walmart',
        date: '2021-08-27',
      },
      {
        id: createShortGuid(),
        amount: -102.34,
        description: 'Mortgage',
        date: '2021-08-27',
      },
    ].concat(generateFakeTransactions(2)),
  },
};

function generateFakeTransactions(count: number) {
  const additionalData = [];
  for (let i = 0; i < count; i++) {
    const currentDate = new Date(`2021-08-27`);
    for (let j = 0; j < 5; j++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + j);
      const newItem = {
        category: {
          label: 'Category',
          emoji: '😊',
          backgroundColor: '#e0cdcd',
          id: createShortGuid(),
        },
        id: createShortGuid(),
        amount: -(Math.random() * 200).toFixed(2), // Random negative amount
        description: 'Description',
        date: newDate.toISOString().slice(0, 10), // Format date as 'YYYY-MM-DD'
      };
      additionalData.push(newItem);
    }
  }
  return additionalData;
}
