import { FC } from 'react';
import styled from 'styled-components';
import { Budgets } from '../components/Budgets';
import { Transactions } from '../components/Transactions';
import SplitView from '../components/SplitView';

interface DashboardPageProps {}

export const DashboardPage: FC<DashboardPageProps> = ({}) => {
  return (
    <Styled.container>
      <SplitView left={<Budgets />} right={<Transactions />} />
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
