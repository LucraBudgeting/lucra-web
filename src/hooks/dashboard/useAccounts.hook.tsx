import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/stores/contexts/api.context';
import { IBankAccount } from '@/types/models/bank/BankAccount';

type useAccountsHookProps = [accounts: any, isFetching: boolean];

export function useAccounts(): useAccountsHookProps {
  const [accounts, setAccounts] = useState<IBankAccount[]>([]);
  const [isFetchingAccounts, setIsFetchingAccounts] = useState(false);
  const { bankApi } = useContext(ApiContext);

  useEffect(() => {
    setIsFetchingAccounts(true);

    bankApi
      .getBankAccounts()
      .then((data) => {
        setAccounts(data.bankAccounts);
      })
      .finally(() => {
        setIsFetchingAccounts(false);
      });

    return () => {
      setIsFetchingAccounts(false);
    };
  }, []);

  return [accounts, isFetchingAccounts];
}
