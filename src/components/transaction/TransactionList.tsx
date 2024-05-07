import { FC } from 'react';
import { transaction } from './transaction.type';
import styled from 'styled-components';
import dayjs from 'dayjs';
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
};

export const TransactionList: FC<TransactionListProps> = ({ transactions }) => {
  const groupedTransactions = groupTransactionsByDate(transactions);
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
