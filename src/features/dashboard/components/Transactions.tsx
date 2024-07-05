import { FC, useState } from 'react';
import styled from 'styled-components';
import { TransactionList } from '@/components/transaction/TransactionList';
import { ITransaction } from '@/types/basic/Transaction.type';
import { TransactionHeader } from './TransactionHeader';

interface TransactionsProps {
  transactions: ITransaction[];
}

export const Transactions: FC<TransactionsProps> = ({ transactions }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(() => transactions);
  const [search, setSearch] = useState('');

  const searchTransactions = (search: string) => {
    setSearch(search);
    setFilteredTransactions(
      transactions.filter((transaction) =>
        transaction.name
          ? transaction.name.toLowerCase().includes(search.toLowerCase())
          : false || transaction.merchantName
            ? transaction.merchantName.toLowerCase().includes(search.toLowerCase())
            : false
      )
    );
  };

  return (
    <Styles.container>
      <TransactionHeader searchValue={search} onSearchChange={searchTransactions} />
      <TransactionList transactions={filteredTransactions} />
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
