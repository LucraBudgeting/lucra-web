import { FC } from 'react';
import styled from 'styled-components';
import { useCategories } from '@/hooks/dashboard/useCategories.hook';
import { useTransactions } from '@/hooks/dashboard/useTransactions.hook';
import { Budgets } from '../components/Budgets';
import { Transactions } from '../components/Transactions';
import SplitView from '../components/SplitView';

interface DashboardPageProps {}

export const DashboardPage: FC<DashboardPageProps> = ({}) => {
  const [categories, isCategoriesFetching] = useCategories();
  const [transactions, isTransactionsFetching] = useTransactions();

  return (
    <Styled.container>
      <SplitView
        left={<Budgets categories={categories} isFetching={isCategoriesFetching} />}
        right={<Transactions transactions={transactions} isFetching={isTransactionsFetching} />}
      />
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    width: 100%;
    padding-top: 1vh;
    height: 99vh;
  `,
};
