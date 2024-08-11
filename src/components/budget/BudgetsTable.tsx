import { FC } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ICategoriesSplit } from '@/hooks/dashboard/useCategories.hook';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { Budgets1moTable } from './tables/Budgets1moTable';
import { BudgetAggregateTable } from './tables/BudgetAggregateTable';

interface BudgetsTableProps {
  categories: ICategoriesSplit;
}

export const BudgetsTable: FC<BudgetsTableProps> = ({ categories }) => {
  const [containerRef] = useAutoAnimate();
  const { currentRange } = dashboardSelector();

  return (
    <div ref={containerRef}>
      {currentRange === '1mo' ? (
        <Budgets1moTable categories={categories} />
      ) : (
        <BudgetAggregateTable categories={categories} />
      )}
    </div>
  );
};
