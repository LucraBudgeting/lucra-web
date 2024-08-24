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

export interface transactionFilters {
  unCategorized: boolean;
}

const initialFilter: transactionFilters = {
  unCategorized: false,
};

export const Transactions: FC<TransactionsProps> = ({ transactions, isFetching }) => {
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(initialFilter);

  useEffect(() => {
    filterTransactions();
  }, [transactions]);

  const searchTransactions = (search: string) => {
    setSearch(search);
  };

  useEffect(() => {
    filterTransactions();
  }, [filters, search]);

  function filterTransactions() {
    let filteredTransactionsLocal = [...transactions];
    if (search) {
      filteredTransactionsLocal = filteredTransactionsLocal.filter((transaction) =>
        transaction.name
          ? transaction.name.toLowerCase().includes(search.toLowerCase())
          : false || transaction.merchantName
            ? transaction.merchantName.toLowerCase().includes(search.toLowerCase())
            : false
      );
    }

    if (filters.unCategorized) {
      filteredTransactionsLocal = filteredTransactionsLocal.filter(
        (transaction) => !transaction.categoryId
      );
    }

    setFilteredTransactions(filteredTransactionsLocal);
  }

  const updateFilters = (filter: transactionFilters) => {
    setFilters({ ...filters, ...filter });
  };

  return (
    <Styles.container>
      <TransactionHeader
        searchValue={search}
        onSearchChange={searchTransactions}
        filters={filters}
        updateFilters={updateFilters}
      />
      <Styles.listContainer className="transaction-list-container">
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
    max-height: 100%;
  `,
  listContainer: styled.div`
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: -50rem;
  `,
};
