import { ChangeEvent, FC, useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useOutsideClickRef } from '@/hooks/react/useOutsideClickRef';
import { dashboardSelector, setCategories } from '@/stores/slices/Dashboard.slice';
import { ICategory } from '@/types/basic/Category.type';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { useTransactions } from '@/hooks/dashboard/useTransactions.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { balanceEntryToText, textToBalanceEntry } from '@/types/types';
import { ApiContext } from '@/stores/contexts/api.context';
import { TransactionList } from '../transaction/TransactionList';
import { calcRemaining, calcIsRemainingGood } from '../budget/budgetCalculator';
import { EditOrAddCategory } from '../budget/EditOrAddCategory';

interface ViewBudgetDialogProps extends DialogProps {
  category: ICategory;
}

export const ViewBudgetDialog: FC<ViewBudgetDialogProps> = (props) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [transactions, isTransactionsFetching] = useTransactions();
  const [category, setCategory] = useState<ICategory>(props.category);
  const [isCategorySaving, setIsCategorySaving] = useState(false);

  const dispatch = useDispatch();

  const { categoryApi } = useContext(ApiContext);

  const { closeCb } = props;
  const { id, label, avatar, amount, budgetType } = category;

  const filterTransactions = () =>
    transactions.filter((transaction) => transaction.categoryId === id);

  const actual = id ? dashboardSelector().budgetActuals[id] : 0;
  const remaining = calcRemaining(amount, actual);
  const isRemainingGood = calcIsRemainingGood(amount, actual, budgetType);

  const headerLabel = isEditEnabled ? 'Edit category' : avatar.emoji + label;

  const ref = useOutsideClickRef(closeCb);

  const toggleEdit = () => {
    setIsEditEnabled(!isEditEnabled);
  };

  const onBudgetTypeChange = (budgetTypeText: string) => {
    const budgetType = textToBalanceEntry(budgetTypeText);
    setCategory({ ...category, budgetType });
  };

  const onLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, label: e.target.value });
  };

  const onEmojiChange = (emoji: string) => {
    setCategory({ ...category, avatar: { ...category.avatar, emoji } });
  };

  const onBudgetedChange = (budgeted: number) => {
    setCategory({ ...category, amount: budgeted });
  };

  const saveCategory = () => {
    setIsCategorySaving(true);
    categoryApi
      .UpdateCategory(category)
      .then((res) => {
        dispatch(setCategories(res.categories));
        toggleEdit();
      })
      .finally(() => {
        setIsCategorySaving(false);
      });
  };

  return (
    <DialogContainer
      forwardRef={ref}
      {...props}
      editCb={toggleEdit}
      enableFooter={isEditEnabled}
      headerText={headerLabel}
      successCb={saveCategory}
    >
      {isEditEnabled ? (
        <Styles.editContainer>
          {isCategorySaving ? (
            <LoadingComponent loadingText="Saving Category" />
          ) : (
            <EditOrAddCategory
              budgetType={balanceEntryToText(category.budgetType)}
              onBudgetTypeChange={onBudgetTypeChange}
              label={category.label}
              onLabelChange={onLabelChange}
              currentEmoji={category.avatar.emoji}
              onEmojiChange={onEmojiChange}
              budgetedAmount={category.amount}
              onBudgetedChange={onBudgetedChange}
            />
          )}
        </Styles.editContainer>
      ) : (
        <Styles.detailsContainer>
          <Styles.infoBlock>
            <h2>Budget</h2>
            <h3>{formatAsMoney(amount, true)}</h3>
          </Styles.infoBlock>
          <Styles.infoBlock>
            <h2>Actual</h2>
            <h3>{formatAsMoney(actual, true)}</h3>
          </Styles.infoBlock>
          <hr />
          <Styles.remainingInfoBlock isremaininggood={String(isRemainingGood)}>
            <h2>Remaining</h2>
            <h3>{formatAsMoney(remaining, true)}</h3>
          </Styles.remainingInfoBlock>
          <Styles.transactionListContainer>
            {isTransactionsFetching && <LoadingComponent />}
            {!isTransactionsFetching && transactions.length === 0 && <div>No transactions</div>}
            {!isTransactionsFetching && transactions.length > 0 && (
              <TransactionList transactions={filterTransactions()} />
            )}
          </Styles.transactionListContainer>
        </Styles.detailsContainer>
      )}
    </DialogContainer>
  );
};

const baseInfoBlockStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  height: 3rem;
  padding: 0.6rem;
  border-radius: 0.8rem;
  margin: 0;
`;

const Styles = {
  editContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 12px;
  `,
  toggleContainer: styled.div`
    width: 100%;
  `,
  detailsContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 12px;

    hr {
      border: 2px solid #e8e8e8;
      border-radius: 2px;
      width: 100%;
    }
  `,
  infoBlock: styled.div`
    ${baseInfoBlockStyles}
  `,
  remainingInfoBlock: styled.div<{ isremaininggood: string }>`
    ${baseInfoBlockStyles}
    background-color: ${(props) => (props.isremaininggood === 'true' ? '#e8f5e9' : '#fde7e7')};

    h3,
    h2 {
      color: ${(props) => (props.isremaininggood === 'true' ? '#2e7d32' : '#c62828')} !important;
    }
  `,
  transactionListContainer: styled.div`
    max-height: 40vh;
    overflow-y: auto;
  `,
};
