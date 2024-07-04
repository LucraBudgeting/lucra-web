import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BudgetItem } from '@/components/budget/BudgetItem';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';
import { Chevron } from '@/assets/chevron';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { formatAsMoney } from '../../../utils/formatAsMoney';
import { AddBudgetRow } from './AddBudgetRow';

interface BudgetsTableProps {
  categories: ICategoriesSplit;
}

interface ISectionTotals {
  actual: number;
  budget: number;
  remaining: number;
}

const initialSectionTotals: ISectionTotals = {
  actual: 0,
  budget: 0,
  remaining: 0,
};

export const BudgetsTable: FC<BudgetsTableProps> = ({ categories }) => {
  const [incomeRef] = useAutoAnimate();
  const [expenseRef] = useAutoAnimate();

  const { budgetActuals } = dashboardSelector();

  const [incomeTotals, setIncomeTotals] = useState<ISectionTotals>(initialSectionTotals);
  const [expenseTotals, setExpenseTotals] = useState<ISectionTotals>(initialSectionTotals);
  const [isIncomeCollapsed, setIsIncomeCollapsed] = useState(false);
  const [isExpenseCollapsed, setIsExpenseCollapsed] = useState(false);

  useEffect(() => {
    const incomeTotals = categories.credit.reduce(
      (acc, category) => {
        if (!category.id) return acc;

        const actual = budgetActuals[category.id] || 0;
        return {
          actual: acc.actual + actual,
          budget: acc.budget + category.amount,
          remaining: acc.remaining + category.amount - actual,
        };
      },
      { actual: 0, budget: 0, remaining: 0 }
    );

    const expenseTotals = categories.debit.reduce(
      (acc, category) => {
        if (!category.id) return acc;

        const actual = budgetActuals[category.id] || 0;
        return {
          actual: acc.actual + actual,
          budget: acc.budget + category.amount,
          remaining: acc.remaining + category.amount - actual,
        };
      },
      { actual: 0, budget: 0, remaining: 0 }
    );

    setIncomeTotals(incomeTotals);
    setExpenseTotals(expenseTotals);
  }, [budgetActuals]);

  function toggleIncomeCollapse() {
    setIsIncomeCollapsed(!isIncomeCollapsed);
  }

  function toggleExpenseCollapse() {
    setIsExpenseCollapsed(!isExpenseCollapsed);
  }

  return (
    <Styles.tableContainer>
      <Styles.headerContainer>
        <p>Category</p>
        <Styles.tableHeader>
          <p>Budget</p>
          <p>Actual</p>
          <p>Remaining</p>
        </Styles.tableHeader>
      </Styles.headerContainer>
      <Styles.budgetSection>
        <Styles.sectionHeader>
          <p className="section-title" onClick={toggleIncomeCollapse}>
            Income
            <Chevron direction={isIncomeCollapsed ? 'up' : 'down'} />
          </p>
          <Styles.sectionTotalsContainer>
            <p>{formatAsMoney(incomeTotals.budget)}</p>
            <p>{formatAsMoney(incomeTotals.actual)}</p>
            <p>{formatAsMoney(incomeTotals.remaining)}</p>
          </Styles.sectionTotalsContainer>
        </Styles.sectionHeader>
        <span ref={incomeRef}>
          {!isIncomeCollapsed && (
            <Styles.sectionRows>
              {categories.credit.map((category) => (
                <BudgetItem key={category.id} category={category} />
              ))}
            </Styles.sectionRows>
          )}
        </span>
        <AddBudgetRow />
      </Styles.budgetSection>
      <Styles.budgetSection>
        <Styles.sectionHeader>
          <p className="section-title" onClick={toggleExpenseCollapse}>
            Expenses
            <Chevron direction={isExpenseCollapsed ? 'up' : 'down'} />
          </p>
          <Styles.sectionTotalsContainer>
            <p>{formatAsMoney(expenseTotals.budget)}</p>
            <p>{formatAsMoney(expenseTotals.actual)}</p>
            <p>{formatAsMoney(expenseTotals.remaining)}</p>
          </Styles.sectionTotalsContainer>
        </Styles.sectionHeader>
        <span ref={expenseRef}>
          {!isExpenseCollapsed && (
            <Styles.sectionRows>
              {categories.debit.map((category) => (
                <BudgetItem key={category.id} category={category} />
              ))}
            </Styles.sectionRows>
          )}
        </span>
        <AddBudgetRow />
      </Styles.budgetSection>
    </Styles.tableContainer>
  );
};

const Styles = {
  tableContainer: styled.div`
    width: 100%;
  `,
  tableHeader: styled.div`
    width: 40%;
    display: flex;
    gap: 24px;
    min-width: 600px;

    p {
      width: 30%;
      text-align: right;
    }
  `,
  sectionRows: styled.div`
    max-height: 300px;
    overflow-y: auto;

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
  `,
  sectionHeader: styled.div`
    padding-top: 2rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;

    border-bottom: 2px solid #333333;

    .section-title {
      cursor: pointer;
      user-select: none;

      svg {
        margin-left: 1rem;
      }
    }

    p {
      font-size: 18px;
      font-weight: 600;
      line-height: 22px;
      color: #333333;
    }
  `,
  sectionTotalsContainer: styled.div`
    display: flex;
    width: 40%;
    min-width: 600px;
    gap: 24px;

    p {
      text-align: right;
      width: 30%;
    }
  `,
  budgetSection: styled.div``,
  headerContainer: styled.div`
    display: flex;
    justify-content: space-between;

    p {
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      text-align: right;
      color: #9b9b9b;
    }
  `,
};
