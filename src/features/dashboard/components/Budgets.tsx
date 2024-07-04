import { FC } from 'react';
import styled from 'styled-components';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';
import { BudgetsTable } from './BudgetsTable';

interface BudgetsProps {
  categories: ICategoriesSplit;
}

export const Budgets: FC<BudgetsProps> = ({ categories }) => {
  return (
    <Styles.container>
      <BudgetsTable categories={categories} />
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
