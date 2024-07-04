import { FC } from 'react';
import styled from 'styled-components';
import { TransactionList } from '@/components/transaction/TransactionList';
import { ITransaction } from '@/types/basic/Transaction.type';

interface TransactionsProps {
  transactions: ITransaction[];
}

export const Transactions: FC<TransactionsProps> = ({ transactions }) => {
  return (
    <Styles.container>
      <TransactionList transactions={transactions} />
    </Styles.container>
  );
};

const Styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 5rem);
    padding-top: 1vh;
  `,
};
