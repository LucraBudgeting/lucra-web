import { FC, useState } from 'react';
import styled from 'styled-components';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { ICategory } from '@/types/basic/Category.type';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { AvatarEmoji } from '../../atoms/avatar/AvatarEmoji';
import { calcIsRemainingGood, calcRemaining } from './budgetCalculator';
import { ViewBudgetDialog } from './ViewBudgetDialog';

export interface BudgetItemProps {
  category: ICategory;
}

export const BudgetItem: FC<BudgetItemProps> = ({ category }) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { id, label, avatar, amount, budgetType } = category;
  const actual = id ? dashboardSelector().budgetActuals[id] : 0;

  const remaining = calcRemaining(amount, actual);
  const isRemainingGood = calcIsRemainingGood(amount, actual, budgetType);
  const inputWidth = formatAsMoney(amount).length * 10 + 20 + 'px';

  const onBudgetChange = () => {};

  const toggleViewBudgetDialog = () => {
    setIsViewDialogOpen(!isViewDialogOpen);
  };

  return (
    <>
      <Styled.container onClick={toggleViewBudgetDialog}>
        <Styled.budgetContainer>
          <AvatarEmoji emoji={avatar.emoji} backgroundColor={avatar.backgroundColor} align="left" />
          <Styled.title>{label}</Styled.title>
        </Styled.budgetContainer>
        <Styled.amountContainer>
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
        </Styled.amountContainer>
      </Styled.container>
      {isViewDialogOpen && (
        <ViewBudgetDialog category={category} closeCb={toggleViewBudgetDialog} />
      )}
    </>
  );
};

const Styled = {
  container: styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-bottom: solid 1px #ccc;
    cursor: pointer;
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
    min-width: 60%;
  `,
  budgetContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  `,
  title: styled.p``,
  amountCell: styled.div`
    width: 30%;
    text-align: right;
  `,
  amountContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
    gap: 24px;
    width: 40%;
    min-width: 600px;
  `,
  remainingCell: styled.div<{ isremaininggood: string }>`
    color: ${(props) => (props.isremaininggood == 'true' ? '#2AA64C' : '#CA4141')};
    font-weight: 600;
    width: 30%;
    text-align: right;
  `,
};
