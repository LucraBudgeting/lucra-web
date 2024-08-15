import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/stores/contexts/api.context';
import { ITransaction } from '@/types/basic/Transaction.type';

type UseTransactionsResponseType = [transactions: ITransaction[], isFetching: boolean];

const now = new Date();
const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

export function useAccountTransactions(accountId: string): UseTransactionsResponseType {
  const apis = useContext(ApiContext);

  const [isFetching, setIsFetching] = useState(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    apis.transactionApi
      .GetAccountTransactions(accountId, oneYearAgo.toISOString(), now.toISOString())
      .then((data) => {
        setTransactions(data.transactions);
      })
      .finally(() => {
        setIsFetching(false);
      });

    return () => {
      setIsFetching(true);
    };
  }, [accountId]);

  return [transactions, isFetching];
}
