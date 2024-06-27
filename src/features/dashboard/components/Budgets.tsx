import { FC } from 'react';
import styled from 'styled-components';
import { BudgetItem } from '@/components/budget/BudgetItem';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';

interface BudgetsProps {
  categories: ICategoriesSplit;
}

export const Budgets: FC<BudgetsProps> = ({ categories }) => {
  return (
    <Styles.container>
      <p>Income</p>
      {categories.credit.map((category) => (
        <BudgetItem key={category.id} category={category} />
      ))}
      <p>Expenses</p>
      {categories.debit.map((category) => (
        <BudgetItem key={category.id} category={category} />
      ))}
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
