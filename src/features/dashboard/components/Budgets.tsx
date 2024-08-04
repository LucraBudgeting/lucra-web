import { FC } from 'react';
import styled from 'styled-components';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';
import { BudgetsTable } from '@/components/budget/BudgetsTable';
import { BudgetHeader } from '@/components/budget/BudgetHeader';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';

interface BudgetsProps {
  categories: ICategoriesSplit;
  isFetching: boolean;
}

export const Budgets: FC<BudgetsProps> = ({ categories, isFetching }) => {
  return (
    <Styles.container>
      <BudgetHeader />
      {isFetching ? (
        <LoadingComponent loadingText="Loading Budgets" />
      ) : (
        <BudgetsTable categories={categories} />
      )}
    </Styles.container>
  );
};

const Styles = {
  container: styled.div`
    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* border: solid black 2px; */
    /* margin: 10px; */
  `,
};
