import type { Meta, StoryObj } from '@storybook/react';
import { TransactionList } from '@/components/transaction/TransactionList';
import { createShortGuid } from '@/utils/guid.helper';
import { ParentContainer } from '../ParentContainer';
import { transactionList } from '../__mocks/TransactionList';

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
    transactions: transactionList.concat(generateFakeTransactions(2)),
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
          avatar: {
            emoji: '😊',
            backgroundColor: '#e0cdcd',
          },
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
