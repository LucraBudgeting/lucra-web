import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/stores/contexts/api.context';
import { dashboardSelector, setTransactions } from '@/stores/slices/Dashboard.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { ITransaction } from '@/types/basic/Transaction.type';

type UseTransactionsResponseType = [transactions: ITransaction[], isFetching: boolean];

export function useTransactions(): UseTransactionsResponseType {
  const dispatch = useAppDispatch();
  const apis = useContext(ApiContext);

  const [isFetching, setIsFetching] = useState(true);
  const { transactions } = dashboardSelector();

  useEffect(() => {
    if (transactions.length) {
      setIsFetching(false);
      return;
    }

    apis.transactionApi
      .GetTransactions()
      .then((data) => {
        dispatch(setTransactions(data.transactions));
      })
      .finally(() => {
        setIsFetching(false);
      });

    return () => {
      setIsFetching(true);
    };
  }, []);

  return [transactions, isFetching];
}
