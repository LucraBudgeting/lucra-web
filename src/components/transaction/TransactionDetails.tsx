import { FC } from 'react';
import styled from 'styled-components';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useTransaction } from '@/hooks/dashboard/useTransaction.hook';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { IBankAccount } from '@/types/models/bank/BankAccount';

interface TransactionDetailsProps extends DialogProps {
  id: string;
}

export const TransactionDetails: FC<TransactionDetailsProps> = (props) => {
  const [transaction, isFetching] = useTransaction(props.id);
  const { bankAccounts } = dashboardSelector();
  let bankAccount = {} as IBankAccount;

  if (transaction?.accountId) {
    bankAccount = bankAccounts[transaction.accountId];
  }

  console.log('bankacc', bankAccount);

  return (
    <DialogContainer
      {...props}
      enableHeader={true}
      headerText={transaction?.merchantName || 'Transaction Details'}
    >
      <h1>Transaction Details</h1>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div>
          <pre>
            {/* <code>{JSON.stringify(transaction, null, 4)}</code> */}
            <code>{JSON.stringify(bankAccount, null, 4)}</code>
          </pre>
        </div>
      )}
    </DialogContainer>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
  `,
  title: styled.h3``,
  amount: styled.p``,
  descriptionContainer: styled.div``,
  amountContainer: styled.div``,
  hr: styled.hr``,
};
