import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/stores/contexts/api.context';
import { dashboardSelector, setCategories } from '@/stores/slices/Dashboard.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { ICategory } from '@/types/basic/Category.type';

export interface ICategoriesSplit {
  credit: ICategory[];
  debit: ICategory[];
}

type UseCategoriesResponseType = [categories: ICategoriesSplit, isFetching: boolean];
export function useCategories(): UseCategoriesResponseType {
  const dispatch = useAppDispatch();
  const apis = useContext(ApiContext);

  const [isFetching, setIsFetching] = useState(true);
  const { debitCategories, creditCategories } = dashboardSelector();

  useEffect(() => {
    if (debitCategories.length || creditCategories.length) {
      setIsFetching(false);
      return;
    }

    apis.categoryApi
      .GetCategories()
      .then((data) => {
        dispatch(setCategories(data.categories));
      })
      .finally(() => {
        setIsFetching(false);
      });

    return () => {
      setIsFetching(true);
    };
  }, []);

  return [{ credit: creditCategories, debit: debitCategories }, isFetching];
}
