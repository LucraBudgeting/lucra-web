import { FC } from 'react';
import { TransactionList } from '@/components/transaction/TransactionList';
import { ITransaction } from '@/types/basic/Transaction.type';

interface TransactionsProps {
  transactions: ITransaction[];
}

export const Transactions: FC<TransactionsProps> = ({ transactions }) => {
  return (
    <div>
      <TransactionList transactions={transactions} />
    </div>
  );
};
