import { FC } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { transaction } from './transaction.type';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: transaction[];
}

const Styled = {
  container: styled.div<{ height?: string; width?: string }>`
    width: 100%;
    height: 90vh;
    overflow: auto;
  `,
  dateHeader: styled.div`
    width: 100%;
    display: flex;
    padding: 4px 0;
    justify-content: center;
    background-color: #f2eeeedd;
    font-size: 12px;
  `,
  noTransactionContainer: styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    background-color: #fafcd5;
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
    <Styled.container height="540px">
      {Object.keys(groupedTransactions).map((date) => (
        <div key={date}>
          <Styled.dateHeader>{dayjs(date).format('MMM D, YYYY')}</Styled.dateHeader>
          <ul>
            {groupedTransactions[date].map((transaction, i) => (
              <TransactionItem
                amount={transaction.amount}
                description={transaction.description}
                id={transaction.id}
                key={transaction.id}
                category={transaction.category}
                isLast={i === groupedTransactions[date].length - 1}
              />
            ))}
          </ul>
        </div>
      ))}
    </Styled.container>
  );
};

function groupTransactionsByDate(transactions: transaction[]): { [date: string]: transaction[] } {
  const groupedTransactions: { [date: string]: transaction[] } = {};

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
