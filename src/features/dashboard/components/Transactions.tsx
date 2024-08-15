import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TransactionList } from '@/components/transaction/TransactionList';
import { ITransaction } from '@/types/basic/Transaction.type';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { TransactionHeader } from './TransactionHeader';

interface TransactionsProps {
  transactions: ITransaction[];
  isFetching: boolean;
}

export const Transactions: FC<TransactionsProps> = ({ transactions, isFetching }) => {
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    searchTransactions(search);
  }, [transactions]);

  const searchTransactions = (search: string) => {
    setSearch(search);

    if (!search) return setFilteredTransactions(transactions);

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
      <Styles.listContainer>
        {isFetching ? (
          <LoadingComponent loadingText="Loading Transactions" />
        ) : (
          <TransactionList transactions={filteredTransactions} />
        )}
      </Styles.listContainer>
    </Styles.container>
  );
};

const Styles = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 2.5rem);
  `,
  listContainer: styled.div`
    width: 100%;
    overflow-y: scroll;
  `,
};
