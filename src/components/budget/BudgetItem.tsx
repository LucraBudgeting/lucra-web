import { FC, useState } from 'react';
import styled from 'styled-components';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { ICategory } from '@/types/basic/Category.type';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { ViewBudgetDialog } from '@/components/dialog/ViewBudgetDialog';
import colors from '@/assets/theme/colors';
import { calcIsRemainingGood, calcRemaining } from './budgetCalculator';

export interface BudgetItemProps {
  category: ICategory;
}

export const BudgetItem: FC<BudgetItemProps> = ({ category }) => {
  const { budgetActuals, budgetAverage, currentRange } = dashboardSelector();
  const isAggregate = currentRange !== '1mo';
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { id, label, avatar, amount, budgetType } = category;
  const actual = id ? budgetActuals[id] : 0;

  const remaining = calcRemaining(amount, actual, category.budgetType);
  const isRemainingGood = calcIsRemainingGood(amount, actual, budgetType);
  const inputWidth = formatAsMoney(amount).length * 10 + 20 + 'px';

  const onBudgetChange = () => {};

  const toggleViewBudgetDialog = () => {
    setIsViewDialogOpen(!isViewDialogOpen);
  };

  return (
    <>
      <Styled.container onClick={toggleViewBudgetDialog} id={`budget_item_${category.id}`}>
        <Styled.budgetContainer>
          <p>{avatar.emoji}</p>
          <Styled.title>{label}</Styled.title>
        </Styled.budgetContainer>
        <Styled.amountContainer>
          {!isAggregate && (
            <Styled.amountCell>
              <Styled.input
                width={inputWidth}
                value={formatAsMoney(amount)}
                onChange={onBudgetChange}
              />
            </Styled.amountCell>
          )}
          <Styled.amountCell>{formatAsMoney(actual)}</Styled.amountCell>
          {isAggregate && category.id ? (
            <Styled.amountCell>{formatAsMoney(budgetAverage[category.id] || 0)}</Styled.amountCell>
          ) : (
            <Styled.remainingCell
              $isGood={isRemainingGood}
              $isZero={remaining === 0 || isNaN(remaining)}
            >
              <p>{formatAsMoney(remaining)}</p>
            </Styled.remainingCell>
          )}
        </Styled.amountContainer>
      </Styled.container>
      {isViewDialogOpen && (
        <ViewBudgetDialog
          category={category}
          closeCb={toggleViewBudgetDialog}
          amount={amount}
          isRemainingGood={isRemainingGood}
          remaining={remaining}
          actual={actual}
          average={budgetAverage[category.id ?? ''] || 0}
        />
      )}
    </>
  );
};

const Styled = {
  container: styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    border-bottom: solid 1px #ccc;
    cursor: pointer;
    padding-left: 4px;
    transition: all 0.5s ease;

    &:hover {
      background-color: ${colors.grey[150]};
      box-shadow: 0px 6px 12px 0px #0000000f;
      border-radius: 8px;
    }
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
    gap: 10px;
  `,
  title: styled.p``,
  amountCell: styled.div`
    width: 30%;
    text-align: right;
  `,
  amountContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 6px;
    gap: 24px;
    width: 40%;
    min-width: 600px;

    @media (max-width: 600px) {
      min-width: 60%;
      max-width: 70%;
    }
  `,
  remainingCell: styled.div<{ $isGood: boolean; $isZero: boolean }>`
    p {
      color: ${(props) => {
        if (props.$isZero) return colors.grey[800];
        return props.$isGood ? colors.success.main : colors.error.main;
      }};
      background-color: ${(props) => {
        if (props.$isZero) return colors.grey[300];
        return props.$isGood ? colors.success.focus : colors.error.focus;
      }};
      width: fit-content;
      padding: 6px 10px;
      border-radius: 30px;
    }

    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-weight: 600;
    width: 30%;
    text-align: right;
  `,
};
