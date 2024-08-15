import { FC } from 'react';
import styled from 'styled-components';
import { Transactions } from '@/features/dashboard/components/Transactions';
import { useAccountTransactions } from '@/hooks/dashboard/useAccountTransactions.hook';
import { IBankAccount } from '@/types/models/bank/BankAccount';

interface AccountDetailsProps {
  account: IBankAccount;
}

export const AccountDetails: FC<AccountDetailsProps> = ({ account }) => {
  const { bankInstitution, id } = account;
  const [transactions, isFetching] = useAccountTransactions(id);

  return (
    <Styled.container>
      {bankInstitution?.name}
      <Styled.transactionContainer>
        <Transactions transactions={transactions} isFetching={isFetching} />
      </Styled.transactionContainer>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div``,
  transactionContainer: styled.div`
    height: 400px;
  `,
};
