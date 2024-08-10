import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiContext } from '@/stores/contexts/api.context';
import { dashboardSelector, setBankAccounts } from '@/stores/slices/Dashboard.slice';
import { IBankAccount } from '@/types/models/bank/BankAccount';

type useAccountsHookProps = [accounts: IBankAccount[], isFetching: boolean];

export function useAccounts(cacheBuster?: string): useAccountsHookProps {
  const [isFetchingAccounts, setIsFetchingAccounts] = useState(false);
  const { bankAccounts } = dashboardSelector();

  const dispatch = useDispatch();
  const { bankApi } = useContext(ApiContext);

  useEffect(() => {
    setIsFetchingAccounts(true);

    bankApi
      .getBankAccounts()
      .then((data) => {
        dispatch(setBankAccounts(data.bankAccounts));
      })
      .finally(() => {
        setIsFetchingAccounts(false);
      });

    return () => {
      setIsFetchingAccounts(false);
    };
  }, [cacheBuster]);

  const bankAccountsArray = Object.values(bankAccounts);
  return [bankAccountsArray, isFetchingAccounts];
}
