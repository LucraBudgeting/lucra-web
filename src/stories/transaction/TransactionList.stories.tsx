import type { Meta, StoryObj } from '@storybook/react';
import { TransactionList } from '@/components/transaction/TransactionList';
import { createShortGuid } from '@/utils/guid.helper';
import { ITransaction } from '@/types/basic/Transaction.type';
import { IIsoCurrencyCode } from '@/types/basic/_shared/db.enum';
import { ParentContainer } from '../ParentContainer';
import { mockTransactionList } from '../__mocks/MockTransactionList';

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
    transactions: mockTransactionList.concat(generateFakeTransactions(2)),
  },
};

function generateFakeTransactions(count: number): ITransaction[] {
  const transactions: ITransaction[] = [];
  const isoCurrencyCodes: IIsoCurrencyCode[] = ['USD', 'EUR', 'GBP'];
  const paymentChannels: string[] = ['ONLINE', 'IN_STORE'];

  for (let i = 0; i < count; i++) {
    const currentDate = new Date(`2021-08-27`);
    for (let j = 0; j < 5; j++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + j);

      const newTransaction: ITransaction = {
        id: createShortGuid(),
        userId: createShortGuid(),
        amount: parseFloat((Math.random() * 200).toFixed(2)),
        date: newDate.toISOString(),
        isoCurrencyCode: isoCurrencyCodes[Math.floor(Math.random() * isoCurrencyCodes.length)],
        merchantName: Math.random() > 0.5 ? 'MerchantName' : null,
        name: Math.random() > 0.5 ? 'TransactionName' : null,
        pending: Math.random() > 0.5,
        paymentChannel: paymentChannels[Math.floor(Math.random() * paymentChannels.length)],
        addressId: Math.random() > 0.5 ? createShortGuid() : null,
        categoryId: Math.random() > 0.5 ? createShortGuid() : null,
        isExcluded: Math.random() > 0.5,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      };

      transactions.push(newTransaction);
    }
  }

  return transactions;
}
