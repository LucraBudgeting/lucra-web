import { FC } from 'react';
import styled from 'styled-components';
import { BudgetItem } from '@/components/budget/BudgetItem';
import BudgetList from '@/stories/__mocks/BudgetList';

interface BudgetsProps {}

export const Budgets: FC<BudgetsProps> = ({}) => {
  return (
    <Styles.container>
      <BudgetItem {...BudgetList.Default} />
      <BudgetItem {...BudgetList.CreditNoRemaining} />
      <BudgetItem {...BudgetList.CreditRemaining} />
      <BudgetItem {...BudgetList.DebitNoRemaining} />
      <BudgetItem {...BudgetList.DebitRemaining} />
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
