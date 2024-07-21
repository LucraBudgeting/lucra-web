import { useState, useContext, useEffect } from 'react';
import { ApiContext } from '@/stores/contexts/api.context';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
type useTransactionRulesHookProps = [transactionRules: ITransactionRule[], isFetching: boolean];

export function useTransactionRules(cacheBuster?: string): useTransactionRulesHookProps {
  const [transactionRules, setTransactionRules] = useState<ITransactionRule[]>([]);
  const [isFetchingRules, setIsFetchingRules] = useState(false);
  const { rulesApi } = useContext(ApiContext);

  useEffect(() => {
    setIsFetchingRules(true);

    rulesApi
      .GetTransactionRules()
      .then((data) => {
        setTransactionRules(data.rules);
      })
      .finally(() => {
        setIsFetchingRules(false);
      });

    return () => {
      setIsFetchingRules(false);
    };
  }, [cacheBuster]);

  return [transactionRules, isFetchingRules];
}
