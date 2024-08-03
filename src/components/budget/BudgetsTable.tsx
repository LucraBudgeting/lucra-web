import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BudgetItem } from '@/components/budget/BudgetItem';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';
import { Chevron } from '@/assets/chevron';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { calcIsRemainingGood } from '@/components/budget/budgetCalculator';
import { formatAsMoney } from '@/utils/formatAsMoney';
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
  const [budgetsContainerRef] = useAutoAnimate();

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

        const remaining = acc.remaining - category.amount + actual;

        return {
          actual: acc.actual + actual,
          budget: acc.budget + category.amount,
          remaining: remaining,
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

  const isIncomeRemainingGood = calcIsRemainingGood(
    incomeTotals.budget,
    incomeTotals.actual,
    'credit'
  );
  const isExpenseRemainingGood = calcIsRemainingGood(
    expenseTotals.budget,
    expenseTotals.actual,
    'debit'
  );

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
      <Styles.budgetsContainer ref={budgetsContainerRef}>
        <Styles.budgetSection>
          <Styles.sectionHeader>
            <p className="section-title" onClick={toggleIncomeCollapse}>
              Income
              <Chevron direction={isIncomeCollapsed ? 'up' : 'down'} />
            </p>
            <Styles.sectionTotalsContainer>
              <Styles.sectionTotal>{formatAsMoney(incomeTotals.budget)}</Styles.sectionTotal>
              <Styles.sectionTotal>{formatAsMoney(incomeTotals.actual)}</Styles.sectionTotal>
              <Styles.sectionTotal isremaininggood={isIncomeRemainingGood ? 'true' : 'false'}>
                {formatAsMoney(incomeTotals.remaining)}
              </Styles.sectionTotal>
            </Styles.sectionTotalsContainer>
          </Styles.sectionHeader>
          <span>
            {!isIncomeCollapsed && (
              <span>
                <Styles.sectionRows id="budget_income_categories">
                  {categories.credit.map((category) => (
                    <BudgetItem key={category.id} category={category} />
                  ))}
                  <AddBudgetRow initialBudgetType="credit" />
                </Styles.sectionRows>
              </span>
            )}
          </span>
        </Styles.budgetSection>
        <Styles.budgetSection>
          <Styles.sectionHeader>
            <p className="section-title" onClick={toggleExpenseCollapse}>
              Expenses
              <Chevron direction={isExpenseCollapsed ? 'up' : 'down'} />
            </p>
            <Styles.sectionTotalsContainer>
              <Styles.sectionTotal>{formatAsMoney(expenseTotals.budget)}</Styles.sectionTotal>
              <Styles.sectionTotal>{formatAsMoney(expenseTotals.actual)}</Styles.sectionTotal>
              <Styles.sectionTotal isremaininggood={isExpenseRemainingGood ? 'true' : 'false'}>
                {formatAsMoney(expenseTotals.remaining)}
              </Styles.sectionTotal>
            </Styles.sectionTotalsContainer>
          </Styles.sectionHeader>
          <span>
            {!isExpenseCollapsed && (
              <span>
                <Styles.sectionRows id="budget_expense_categories">
                  {categories.debit.map((category) => (
                    <BudgetItem key={category.id} category={category} />
                  ))}
                  <AddBudgetRow initialBudgetType="debit" />
                </Styles.sectionRows>
              </span>
            )}
          </span>
        </Styles.budgetSection>
      </Styles.budgetsContainer>
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

    @media (max-width: 600px) {
      min-width: 60%;
      max-width: 70%;
    }

    p {
      width: 30%;
      text-align: right;
    }
  `,
  sectionRows: styled.div`
    max-height: 35vh;
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
    }
  `,
  sectionTotalsContainer: styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 8px;
    width: 40%;
    min-width: 600px;
    gap: 24px;

    @media (max-width: 600px) {
      min-width: 60%;
      max-width: 70%;
    }
  `,
  sectionTotal: styled.p<{ isremaininggood?: string }>`
    color: ${(props) => {
      if (!props.isremaininggood) return '#333333';
      return props.isremaininggood === 'true' ? '#2AA64C' : '#CA4141';
    }};
    font-weight: 600;
    width: 30%;
    text-align: right;
  `,
  budgetSection: styled.div``,
  headerContainer: styled.div`
    display: flex;
    justify-content: space-between;

    user-select: none;

    p {
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      text-align: right;
      color: #9b9b9b;
    }
  `,
  budgetsContainer: styled.div``,
};
