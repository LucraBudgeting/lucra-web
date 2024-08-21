import { FC, useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BudgetItem } from '@/components/budget/BudgetItem';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';
import { Chevron } from '@/assets/chevron';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { calcIsRemainingGood } from '@/components/budget/budgetCalculator';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { AddBudgetRow } from '../AddBudgetRow';
import { Styles } from './Styles';
import { NetRow } from './NetRow';

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

export const Budgets1moTable: FC<BudgetsTableProps> = ({ categories }) => {
  const [budgetsContainerRef] = useAutoAnimate();

  const { budgetActuals, totalTransactionIncome, totalTransactionExpense } = dashboardSelector();

  const [incomeTotals, setIncomeTotals] = useState<ISectionTotals>(initialSectionTotals);
  const [expenseTotals, setExpenseTotals] = useState<ISectionTotals>(initialSectionTotals);
  const [isIncomeCollapsed, setIsIncomeCollapsed] = useState(false);
  const [isExpenseCollapsed, setIsExpenseCollapsed] = useState(false);

  useEffect(() => {
    calculate1moTotals();
  }, [budgetActuals]);

  function calculate1moTotals() {
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
  }

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
    <Styles.tableContainer id="budgets-table-container">
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
          <Styles.sectionHeader onClick={toggleIncomeCollapse}>
            <p className="section-title">
              Income
              <Chevron direction={isIncomeCollapsed ? 'up' : 'down'} />
            </p>
            <Styles.sectionTotalsContainer>
              <Styles.sectionTotal>{formatAsMoney(incomeTotals.budget)}</Styles.sectionTotal>
              <Styles.sectionTotal>{formatAsMoney(totalTransactionIncome)}</Styles.sectionTotal>
              <Styles.sectionTotal $isGood={isIncomeRemainingGood ? 'true' : 'false'}>
                {formatAsMoney(Math.abs(incomeTotals.remaining))}
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
          <Styles.sectionHeader onClick={toggleExpenseCollapse}>
            <p className="section-title">
              Expenses
              <Chevron direction={isExpenseCollapsed ? 'up' : 'down'} />
            </p>
            <Styles.sectionTotalsContainer>
              <Styles.sectionTotal>{formatAsMoney(expenseTotals.budget)}</Styles.sectionTotal>
              <Styles.sectionTotal>{formatAsMoney(totalTransactionExpense)}</Styles.sectionTotal>
              <Styles.sectionTotal $isGood={isExpenseRemainingGood ? 'true' : 'false'}>
                {formatAsMoney(Math.abs(expenseTotals.remaining))}
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
        <NetRow
          incomeTotal={incomeTotals.actual}
          expenseTotal={expenseTotals.actual}
          incomeRemaining={incomeTotals.remaining}
          expenseRemaining={expenseTotals.remaining}
          incomeBudgetTotal={incomeTotals.budget}
          expenseBudgetTotal={expenseTotals.budget}
        />
      </Styles.budgetsContainer>
    </Styles.tableContainer>
  );
};
