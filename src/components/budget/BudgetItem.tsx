import { FC } from 'react';
import styled from 'styled-components';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { ICategory } from '@/types/basic/Category.type';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { AvatarEmoji } from '../../atoms/avatar/AvatarEmoji';
import { calcIsRemainingGood, calcRemaining } from './budgetCalculator';

export interface BudgetItemProps {
  category: ICategory;
}

export const BudgetItem: FC<BudgetItemProps> = ({ category }) => {
  const { id, label, avatar, amount, budgetType } = category;
  const actual = id ? dashboardSelector().budgetActuals[id] : 0;

  const remaining = calcRemaining(amount, actual);
  const isRemainingGood = calcIsRemainingGood(amount, actual, budgetType);
  const inputWidth = formatAsMoney(amount).length * 10 + 20 + 'px';

  const onBudgetChange = () => {};

  return (
    <Styled.container>
      <Styled.budgetContainer>
        <AvatarEmoji emoji={avatar.emoji} backgroundColor={avatar.backgroundColor} />
        <Styled.title>{label}</Styled.title>
      </Styled.budgetContainer>
      <Styled.budgetContainer>
        <Styled.amountCell>
          <Styled.input
            width={inputWidth}
            value={formatAsMoney(amount)}
            onChange={onBudgetChange}
          />
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
