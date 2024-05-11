import { DiaglogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DiaglogProps } from '@/atoms/dialog/Dialog.types';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { category } from '../category/category.type';
import { balanceEntry } from '@/types/types';
import { calcIsRemainingGood, calcRemaining } from '../budget/budgetCalculator';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { DividerSvg } from '@/assets/divider';
import { TransactionList } from '../transaction/TransactionList';

interface CategoryBudgetDetailsProps extends DiaglogProps {
  category: category;
  budgeted: number;
  actual: number;
  budgetType: balanceEntry;
}

export const CategoryBudgetDetails: FC<CategoryBudgetDetailsProps> = (props) => {
  const [dividerWidth, setDividerWidth] = useState('20');
  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const { category, budgeted, actual, budgetType } = props;
  const dialogTitle = (category.emoji ? category.emoji + ' ' : '') + category.label;
  const remaining = calcRemaining(budgeted, actual);
  const isRemainingGood = calcIsRemainingGood(budgeted, actual, budgetType);

  useEffect(() => {
    const offsetWidth = sectionContainerRef?.current?.offsetWidth;
    if (!offsetWidth) return;
    setDividerWidth((offsetWidth * 0.9).toString());
  }, [sectionContainerRef]);

  return (
    <DiaglogContainer {...props} headerText={dialogTitle}>
      <Styled.container>
        <Styled.sectionContainer ref={sectionContainerRef}>
          <Styled.section>
            <h6>Budget</h6>
            <h4>{formatAsMoney(budgeted)}</h4>
          </Styled.section>
          <Styled.section>
            <h6>Actual</h6>
            <h4>{formatAsMoney(actual)}</h4>
          </Styled.section>
          <DividerSvg width={dividerWidth} />
          <Styled.section type={isRemainingGood ? 'success' : 'warning'}>
            <h6>Remaining</h6>
            <h4>{formatAsMoney(remaining)}</h4>
          </Styled.section>
        </Styled.sectionContainer>
        <Styled.transactionContainer>
          <h4>Transactions</h4>
          <TransactionList transactions={[]} />
        </Styled.transactionContainer>
      </Styled.container>
    </DiaglogContainer>
  );
};

const Styled = {
  container: styled.div`
    width: 100%;
  `,
  transactionContainer: styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    h4 {
      color: var(--Black-100, #000);
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 125% */
    }
  `,
  sectionContainer: styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  `,
  section: styled.section<{ type?: 'warning' | 'success' }>`
    flex: 1;
    display: flex;
    padding: 24px 20px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    border-radius: 16px;
    background: ${({ type }) => {
      switch (type) {
        case 'warning':
          return '#FFE9E9';
        case 'success':
          return '#d4fade';
        default:
          return '#f9f9f9';
      }
    }};
  `,
};
