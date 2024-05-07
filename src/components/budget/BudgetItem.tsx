import { FC } from 'react';
import styled from 'styled-components';
import { AvatarEmoji } from '../avatar/AvatarEmoji';
import { balanceEntry } from '@/types/types';
import { formatAsMoney } from '@/utils/formatAsMoney';

interface BudgetItemProps {
  avatar: {
    emoji: string;
    backgroundColor: string;
  };
  title: string;
  budgeted: number;
  actual: number;
  budgetType: balanceEntry;
}

export const BudgetItem: FC<BudgetItemProps> = ({
  avatar,
  title,
  budgeted,
  actual,
  budgetType,
}) => {
  const remaining = calcRemaining(budgeted, actual);
  const isRemainingGood = calcIsRemainingGood(budgeted, actual, budgetType);
  return (
    <Styled.container>
      <Styled.budgetContainer>
        <AvatarEmoji emoji={avatar.emoji} backgroundColor={avatar.backgroundColor} />
        <Styled.title>{title}</Styled.title>
      </Styled.budgetContainer>
      <Styled.budgetContainer>
        <Styled.amountCell>{formatAsMoney(budgeted)}</Styled.amountCell>
        <Styled.amountCell>{formatAsMoney(actual)}</Styled.amountCell>
        <Styled.remainingCell isremaininggood={isRemainingGood ? 'true' : 'false'}>
          {formatAsMoney(remaining)}
        </Styled.remainingCell>
      </Styled.budgetContainer>
    </Styled.container>
  );
};

function calcIsRemainingGood(budgeted: number, actual: number, budgetType: balanceEntry) {
  if (budgetType === 'credit') {
    return actual - budgeted < 0;
  } else {
    return budgeted - actual < 0;
  }
}

function calcRemaining(budgeted: number, actual: number) {
  return Math.abs(budgeted - actual);
}

const Styled = {
  container: styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  budgetContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  `,
  title: styled.p``,
  amountCell: styled.div``,
  remainingCell: styled.div<{ isremaininggood: string }>`
    color: ${(props) => (props.isremaininggood == 'true' ? '#2AA64C' : '#CA4141')};
    font-weight: 600;
  `,
  
};
