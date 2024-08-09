import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/stores/contexts/api.context';
import { ITransaction } from '@/types/basic/Transaction.type';

type UseTransactionResponseType = [transaction: ITransaction | undefined, isFetching: boolean];

export function useTransaction(id: string): UseTransactionResponseType {
  const apis = useContext(ApiContext);

  const [isFetching, setIsFetching] = useState(true);
  const [transaction, setTransaction] = useState<ITransaction>();

  useEffect(() => {
    apis.transactionApi
      .GetTransaction(id)
      .then((data) => {
        setTransaction(data.transaction);
      })
      .finally(() => {
        setIsFetching(false);
      });

    return () => {
      setIsFetching(true);
    };
  }, [id]);

  return [transaction, isFetching];
}
