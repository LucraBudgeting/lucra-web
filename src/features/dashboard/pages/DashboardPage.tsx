import { FC } from 'react';
import styled from 'styled-components';
import { useCategories } from '@/hooks/dashboard/useCategories.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { useTransactions } from '@/hooks/dashboard/useTransactions.hook';
import { Budgets } from '../components/Budgets';
import { Transactions } from '../components/Transactions';
import SplitView from '../components/SplitView';

interface DashboardPageProps {}

export const DashboardPage: FC<DashboardPageProps> = ({}) => {
  const [categories, isCategoriesFetching] = useCategories();
  const [transactions, isTransactionsFetching] = useTransactions();

  if (isCategoriesFetching || isTransactionsFetching)
    return <LoadingComponent loadingText="Loading Dashboard" />;

  console.log('categories', categories);
  console.log('transactions', transactions);
  return (
    <Styled.container>
      <SplitView left={<Budgets categories={categories} />} right={<Transactions />} />
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    width: 100%;
    /* border: solid black 2px; */
  `,
};
