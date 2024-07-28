import { useState, useContext, useEffect } from 'react';
import { ApiContext } from '@/stores/contexts/api.context';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { IRuleSettings } from '@/types/models/rules/rule.type';
type useTransactionRulesHookProps = {
  transactionRules: ITransactionRule[];
  ruleSettings: IRuleSettings;
  isFetching: boolean;
};

export function useTransactionRules(cacheBuster?: string): useTransactionRulesHookProps {
  const [transactionRules, setTransactionRules] = useState<ITransactionRule[]>([]);
  const [ruleSettings, setRuleSettings] = useState<IRuleSettings>({ autoApplyCategories: false });
  const [isFetchingRules, setIsFetchingRules] = useState(false);
  const { rulesApi } = useContext(ApiContext);

  useEffect(() => {
    setIsFetchingRules(true);

    rulesApi
      .GetTransactionRules()
      .then((data) => {
        setTransactionRules(data.rules);
        setRuleSettings(data.settings);
      })
      .finally(() => {
        setIsFetchingRules(false);
      });

    return () => {
      setIsFetchingRules(false);
    };
  }, [cacheBuster]);

  return { transactionRules, ruleSettings, isFetching: isFetchingRules };
}
