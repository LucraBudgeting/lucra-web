import { FC } from 'react';
import styled from 'styled-components';
import { balanceEntry } from '@/types/types';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { AvatarEmoji } from '../../atoms/avatar/AvatarEmoji';
import { calcIsRemainingGood, calcRemaining } from './budgetCalculator';

export interface BudgetItemProps {
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
  const inputWidth = formatAsMoney(budgeted).length * 10 + 20 + 'px';

  return (
    <Styled.container>
      <Styled.budgetContainer>
        <AvatarEmoji emoji={avatar.emoji} backgroundColor={avatar.backgroundColor} />
        <Styled.title>{title}</Styled.title>
      </Styled.budgetContainer>
      <Styled.budgetContainer>
        <Styled.amountCell>
          <Styled.input width={inputWidth} value={formatAsMoney(budgeted)} />
        </Styled.amountCell>
        <Styled.amountCell>{formatAsMoney(actual)}</Styled.amountCell>
        <Styled.remainingCell isremaininggood={isRemainingGood ? 'true' : 'false'}>
          {formatAsMoney(remaining)}
        </Styled.remainingCell>
      </Styled.budgetContainer>
    </Styled.container>
  );
};

const Styled = {
  container: styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 1rem;
    border-bottom: solid 1px #ccc;
  `,
  input: styled.input<{ width: string }>`
    border: 1px solid #ccc;
    background-color: transparent;
    color: black;
    border-radius: 4px;
    padding: 8px;
    width: ${(props) => props.width};
    text-align: right;
    font-size: 16px;
    box-sizing: border-box;
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
