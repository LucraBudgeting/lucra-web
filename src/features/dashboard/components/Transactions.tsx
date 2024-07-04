import { FC } from 'react';
import styled from 'styled-components';
import { TransactionList } from '@/components/transaction/TransactionList';
import { ITransaction } from '@/types/basic/Transaction.type';
import { TransactionHeader } from './TransactionHeader';

interface TransactionsProps {
  transactions: ITransaction[];
}

export const Transactions: FC<TransactionsProps> = ({ transactions }) => {
  return (
    <Styles.container>
      <TransactionHeader />
      <TransactionList transactions={transactions} />
    </Styles.container>
  );
};

const Styles = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 5rem);
    padding-top: 1vh;
  `,
};
