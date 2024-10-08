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
  const { transactions, dateRange } = dashboardSelector();

  useEffect(() => {
    apis.transactionApi
      .GetTransactions(dateRange.startDate, dateRange.endDate)
      .then((data) => {
        dispatch(setTransactions(data.transactions));
      })
      .finally(() => {
        setIsFetching(false);
      });

    return () => {
      setIsFetching(true);
    };
  }, [dateRange]);

  return [transactions, isFetching];
}
