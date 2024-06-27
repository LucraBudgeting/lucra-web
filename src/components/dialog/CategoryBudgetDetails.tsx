import { FC, useEffect, useRef, useState } from 'react';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { balanceEntry } from '@/types/types';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { DividerSvg } from '@/assets/divider';
import { ICategory } from '../../types/basic/Category.type';
import { calcIsRemainingGood, calcRemaining } from '../budget/budgetCalculator';
import { TransactionList } from '../transaction/TransactionList';
import { Styled } from './Styled';

interface CategoryBudgetDetailsProps extends DialogProps {
  category: ICategory;
  budgeted: number;
  actual: number;
  budgetType: balanceEntry;
}

export const CategoryBudgetDetails: FC<CategoryBudgetDetailsProps> = (props) => {
  const [dividerWidth, setDividerWidth] = useState('20');
  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const { category, budgeted, actual, budgetType } = props;
  const dialogTitle = (category.avatar.emoji ? category.avatar.emoji + ' ' : '') + category.label;
  const remaining = calcRemaining(budgeted, actual);
  const isRemainingGood = calcIsRemainingGood(budgeted, actual, budgetType);

  useEffect(() => {
    const offsetWidth = sectionContainerRef?.current?.offsetWidth;
    if (!offsetWidth) return;
    setDividerWidth((offsetWidth * 0.9).toString());
  }, [sectionContainerRef]);

  return (
    <DialogContainer {...props} headerText={dialogTitle}>
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
    </DialogContainer>
  );
};
