import { FC } from 'react';
import { TransactionList } from '@/components/transaction/TransactionList';
import { transactionList } from '@/stories/__mocks/TransactionList';

interface TransactionsProps {}

export const Transactions: FC<TransactionsProps> = ({}) => {
  return (
    <div>
      <TransactionList transactions={transactionList} />
    </div>
  );
};
