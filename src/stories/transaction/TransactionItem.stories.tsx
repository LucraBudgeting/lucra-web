import type { Meta, StoryObj } from '@storybook/react';
import { TransactionItem } from '@/components/transaction/TransactionItem';
import { ParentContainer } from '../ParentContainer';

const ItemParent = (props: any) => {
  return (
    <ParentContainer width="450px">
      <TransactionItem {...props} />
    </ParentContainer>
  );
};

const meta = {
  title: 'transaction/TransactionItem',
  component: ItemParent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ItemParent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: {
      label: 'Eating Out',
      emoji: '🍔',
      backgroundColor: '#FDF9A9',
    },
    amount: -49.88,
    description: 'TST* Rodney Scotts BBQ',
  },
};

export const Last: Story = {
  args: {
    category: {
      label: 'Groceries',
      emoji: '🛒',
      backgroundColor: '#FDF9A9',
    },
    amount: -49.88,
    description: 'TST* Rodney Scotts BBQ',
    isLast: true,
  },
};

export const NoCategory: Story = {
  args: {
    amount: -49.88,
    description: 'TST* Rodney Scotts BBQ',
  },
};
