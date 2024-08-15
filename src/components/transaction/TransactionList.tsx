import { FC } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { ITransaction } from '@/types/basic/Transaction.type';
import colors from '@/assets/theme/colors';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: ITransaction[];
}

const Styled = {
  container: styled.div<{ height?: string; width?: string }>`
    width: 100%;
    height: 100%;
    overflow: auto;
  `,
  dateHeader: styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: ${colors.grey[200]};
    color: ${colors.grey[600]};
    font-size: 12px;
    padding-left: 1rem;
  `,
  noTransactionContainer: styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    background-color: #fbfceb35;
  `,
};

export const TransactionList: FC<TransactionListProps> = ({ transactions }) => {
  const groupedTransactions = groupTransactionsByDate(transactions);

  if (!transactions?.length) {
    return (
      <Styled.noTransactionContainer>
        <p>No Transaction History</p>
      </Styled.noTransactionContainer>
    );
  }
  return (
    <Styled.container>
      {Object.keys(groupedTransactions).map((date) => (
        <div key={date}>
          <Styled.dateHeader>{dayjs(date).format('MMM D, YYYY')}</Styled.dateHeader>
          <ul>
            {sortTransactionsByName(groupedTransactions[date]).map((transaction, i) => (
              <TransactionItem
                amount={-transaction.amount}
                description={transaction.merchantName || transaction.name || 'No Description'}
                id={transaction.id}
                categoryId={transaction.categoryId}
                key={transaction.id}
                isLast={i === groupedTransactions[date].length - 1}
              />
            ))}
          </ul>
        </div>
      ))}
    </Styled.container>
  );
};

function groupTransactionsByDate(transactions: ITransaction[]): { [date: string]: ITransaction[] } {
  const groupedTransactions: { [date: string]: ITransaction[] } = {};

  if (!transactions?.length) {
    const todaysDate = new Date().toISOString().split('T')[0]; // Extracting the date part
    groupedTransactions[todaysDate] = [];
    return groupedTransactions;
  }

  transactions.forEach((transaction) => {
    const date = transaction.date.split('T')[0]; // Extracting the date part
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }
    groupedTransactions[date].push(transaction);
  });

  return groupedTransactions;
}

function sortTransactionsByName(transactions: ITransaction[]): ITransaction[] {
  return transactions.sort((a, b) => {
    if (a.merchantName && b.merchantName) {
      return a.merchantName.localeCompare(b.merchantName);
    }
    if (a.name && b.name) {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
}
