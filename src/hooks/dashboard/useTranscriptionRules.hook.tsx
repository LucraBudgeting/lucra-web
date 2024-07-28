import { useState, useContext, useEffect } from 'react';
import { ApiContext } from '@/stores/contexts/api.context';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { IRuleSettings } from '@/types/models/rules/rule.type';
import localStorageRepository from '@/utils/localStorage.repository';
type useTransactionRulesHookProps = {
  transactionRules: ITransactionRule[];
  ruleSettings: IRuleSettings;
  categoryList: Record<string, string>;
  isFetching: boolean;
};

export function useTransactionRules(cacheBuster?: string): useTransactionRulesHookProps {
  const [transactionRules, setTransactionRules] = useState<ITransactionRule[]>([]);
  const [categoryList, setCategoryList] = useState<Record<string, string>>(
    localStorageRepository.getCategoryList() ?? {}
  );
  const [ruleSettings, setRuleSettings] = useState<IRuleSettings>({ autoApplyCategories: false });
  const [isFetchingRules, setIsFetchingRules] = useState(false);
  const { rulesApi, bankApi } = useContext(ApiContext);

  useEffect(() => {
    let isMounted = true;
    if (Object.keys(categoryList).length > 0) {
      return;
    }

    bankApi.getBankCategoryList().then((data) => {
      if (!isMounted) return;

      localStorageRepository.setCategoryList(data.categoryList);
      setCategoryList(data.categoryList);
    });

    return () => {
      isMounted = false;
    };
  }, [categoryList]);

  useEffect(() => {
    let isMounted = true;
    setIsFetchingRules(true);

    rulesApi
      .GetTransactionRules()
      .then((data) => {
        if (!isMounted) return;

        setTransactionRules(data.rules);
        setRuleSettings(data.settings);
      })
      .finally(() => {
        setIsFetchingRules(false);
      });

    return () => {
      isMounted = false;
    };
  }, [cacheBuster]);

  return { transactionRules, ruleSettings, isFetching: isFetchingRules, categoryList };
}
