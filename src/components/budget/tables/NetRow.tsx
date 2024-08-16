import { FC, useEffect, useState } from 'react';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { Styles } from './Styles';

interface NetRowProps {
  incomeTotal: number;
  expenseTotal: number;
  incomeAverage?: number;
  expenseAverage?: number;
  incomeRemaining?: number;
  expenseRemaining?: number;
  incomeBudgetTotal?: number;
  expenseBudgetTotal?: number;
}

export const NetRow: FC<NetRowProps> = ({
  incomeRemaining,
  expenseRemaining,
  incomeTotal,
  expenseTotal,
  incomeAverage,
  expenseAverage,
  incomeBudgetTotal,
  expenseBudgetTotal,
}) => {
  const { currentRange } = dashboardSelector();

  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [average, setAverage] = useState(0);
  const [budgetTotal, setBudgetTotal] = useState(0);

  const isAggregate = currentRange !== '1mo';

  useEffect(() => {
    if (incomeRemaining && expenseRemaining) {
      setRemaining(incomeRemaining - expenseRemaining);
    }
  }, [incomeRemaining, expenseRemaining]);
  useEffect(() => {
    setTotal(incomeTotal - expenseTotal);
  }, [incomeTotal, expenseTotal]);
  useEffect(() => {
    if (incomeBudgetTotal && expenseBudgetTotal) {
      setBudgetTotal(incomeBudgetTotal - expenseBudgetTotal);
    }
  }, [incomeBudgetTotal, expenseBudgetTotal]);
  useEffect(() => {
    if (incomeAverage && expenseAverage) {
      setAverage(incomeAverage - expenseAverage);
    }
  }, [incomeAverage, expenseAverage]);

  return (
    <Styles.netRowContainer id="net-row-container">
      <Styles.sectionHeader
        style={{ borderBottom: 'none', cursor: 'default', marginBottom: 0, padding: '1rem 0' }}
      >
        <p>Net Balance</p>
        <Styles.sectionTotalsContainer>
          {isAggregate ? (
            <>
              <Styles.sectionTotal $isGood={(total > 0).toString()}>
                {formatAsMoney(total)}
              </Styles.sectionTotal>
              <Styles.sectionTotal>{formatAsMoney(average)}</Styles.sectionTotal>
            </>
          ) : (
            <>
              <Styles.sectionTotal>{formatAsMoney(budgetTotal)}</Styles.sectionTotal>
              <Styles.sectionTotal $isGood={(total > 0).toString()}>
                {formatAsMoney(total)}
              </Styles.sectionTotal>
              <Styles.sectionTotal $isGood={(remaining > 0).toString()}>
                {formatAsMoney(remaining)}
              </Styles.sectionTotal>
            </>
          )}
        </Styles.sectionTotalsContainer>
      </Styles.sectionHeader>
    </Styles.netRowContainer>
  );
};
