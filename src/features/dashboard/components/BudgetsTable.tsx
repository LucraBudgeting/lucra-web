import { FC } from 'react';
import styled from 'styled-components';
import { BudgetItem } from '@/components/budget/BudgetItem';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';

interface BudgetsTableProps {
  categories: ICategoriesSplit;
}

export const BudgetsTable: FC<BudgetsTableProps> = ({ categories }) => {
  return (
    <Styles.tableContainer>
      <Styles.headerContainer>
        <p>Category</p>
        <Styles.sectionHeader>
          <p>Budget</p>
          <p>Actual</p>
          <p>Remaining</p>
        </Styles.sectionHeader>
      </Styles.headerContainer>
      <p>Income</p>
      {categories.credit.map((category) => (
        <BudgetItem key={category.id} category={category} />
      ))}
      <p>Expenses</p>
      {categories.debit.map((category) => (
        <BudgetItem key={category.id} category={category} />
      ))}
    </Styles.tableContainer>
  );
};

const Styles = {
  tableContainer: styled.div`
    width: 100%;
  `,
  sectionHeader: styled.div`
    width: 40%;
    display: flex;
    gap: 24px;
    min-width: 600px;

    p {
      width: 30%;
      text-align: right;
    }
  `,
  headerContainer: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;

    p {
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      text-align: right;
      color: #9b9b9b;
    }
  `,
};
