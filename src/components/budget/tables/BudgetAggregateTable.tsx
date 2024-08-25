import { FC, useEffect, useState } from 'react';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { SideArrowFilledIcon } from '@/assets/side-arrow-filled-icon';
import { AddBudgetRow } from '../AddBudgetRow';
import { BudgetItem } from '../BudgetItem';
import { Styles } from './Styles';
import { NetRow } from './NetRow';

interface BudgetAggregateTableProps {
  categories: ICategoriesSplit;
}

interface ISectionTotals {
  total: number;
  average: number;
}

const initialSectionTotals: ISectionTotals = {
  total: 0,
  average: 0,
};

export const BudgetAggregateTable: FC<BudgetAggregateTableProps> = ({ categories }) => {
  let totalMonths = 1;
  const { budgetActuals, currentRange } = dashboardSelector();

  switch (currentRange) {
    case '1mo':
      totalMonths = 1;
      break;
    case '6mo':
      totalMonths = 6;
      break;
    case '12mo':
      totalMonths = 12;
      break;
    default:
      totalMonths = 1;
      break;
  }

  const [incomeTotals, setIncomeTotals] = useState<ISectionTotals>(initialSectionTotals);
  const [expenseTotals, setExpenseTotals] = useState<ISectionTotals>(initialSectionTotals);
  const [isIncomeCollapsed, setIsIncomeCollapsed] = useState(false);
  const [isExpenseCollapsed, setIsExpenseCollapsed] = useState(false);

  useEffect(() => {
    calculateTotals();
  }, [budgetActuals]);

  function calculateTotals() {
    const counts = {
      credit: 0,
      debit: 0,
    };
    const incomeTotals = { ...initialSectionTotals };
    const expenseTotals = { ...initialSectionTotals };

    categories.credit.forEach((category) => {
      if (!category.id) return;

      const amount = parseFloat((budgetActuals[category.id] || 0).toString());
      incomeTotals.total += amount;
      counts.credit++;
    });

    categories.debit.forEach((category) => {
      if (!category.id) return;

      const amount = parseFloat((budgetActuals[category.id] || 0).toString());
      expenseTotals.total += amount;
      counts.debit++;
    });

    incomeTotals.average = Math.abs(incomeTotals.total / totalMonths);
    expenseTotals.average = Math.abs(expenseTotals.total / totalMonths);

    setIncomeTotals(incomeTotals);
    setExpenseTotals(expenseTotals);
  }

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
          <p>Total</p>
          <p>Average</p>
        </Styles.tableHeader>
      </Styles.headerContainer>
      <Styles.budgetsContainer>
        <Styles.budgetSection>
          <Styles.sectionHeader $isFirst={true} onClick={toggleIncomeCollapse}>
            <p className="section-title">
              <SideArrowFilledIcon direction={isIncomeCollapsed ? 'right' : 'down'} />
              Income
            </p>
            <Styles.sectionTotalsContainer>
              <Styles.sectionTotal>{formatAsMoney(incomeTotals.total)}</Styles.sectionTotal>
              <Styles.sectionTotal>{formatAsMoney(incomeTotals.average)}</Styles.sectionTotal>
            </Styles.sectionTotalsContainer>
          </Styles.sectionHeader>
          <span>
            {!isIncomeCollapsed && (
              <span>
                <Styles.sectionRows id="budget_income_categories">
                  {categories.credit.map((category) => (
                    <BudgetItem key={category.id} category={category} />
                  ))}
                  <AddBudgetRow />
                </Styles.sectionRows>
              </span>
            )}
          </span>
        </Styles.budgetSection>
        <Styles.budgetSection>
          <Styles.sectionHeader onClick={toggleExpenseCollapse}>
            <p className="section-title">
              <SideArrowFilledIcon direction={isExpenseCollapsed ? 'right' : 'down'} />
              Expense
            </p>
            <Styles.sectionTotalsContainer>
              <Styles.sectionTotal>{formatAsMoney(expenseTotals.total)}</Styles.sectionTotal>
              <Styles.sectionTotal>{formatAsMoney(expenseTotals.average)}</Styles.sectionTotal>
            </Styles.sectionTotalsContainer>
          </Styles.sectionHeader>
          <span>
            {!isExpenseCollapsed && (
              <span>
                <Styles.sectionRows id="budget_expense_categories">
                  {categories.debit.map((category) => (
                    <BudgetItem key={category.id} category={category} />
                  ))}
                  <AddBudgetRow />
                </Styles.sectionRows>
              </span>
            )}
          </span>
        </Styles.budgetSection>
        <NetRow
          incomeTotal={incomeTotals.total}
          expenseTotal={expenseTotals.total}
          incomeAverage={incomeTotals.average}
          expenseAverage={expenseTotals.average}
        />
      </Styles.budgetsContainer>
    </Styles.tableContainer>
  );
};
