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
import colors from '@/assets/theme/colors';
import { TransactionList } from '../transaction/TransactionList';
import { calcRemaining, calcIsRemainingGood } from '../budget/budgetCalculator';
import { EditOrAddCategory } from '../budget/EditOrAddCategory';
import { DestroyDialog } from './Destroy/DestroyDialog';

interface ViewBudgetDialogProps extends DialogProps {
  category: ICategory;
}

export const ViewBudgetDialog: FC<ViewBudgetDialogProps> = (props) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [transactions, isTransactionsFetching] = useTransactions();
  const [category, setCategory] = useState<ICategory>(props.category);
  const [isCategorySaving, setIsCategorySaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const dispatch = useDispatch();

  const { categoryApi } = useContext(ApiContext);

  const { closeCb } = props;
  const { id, label, avatar, amount, budgetType } = category;

  const filterTransactions = () =>
    transactions.filter((transaction) => transaction.categoryId === id);

  const actual = id ? dashboardSelector().budgetActuals[id] : 0;
  const remaining = calcRemaining(amount, actual);
  const isRemainingGood = calcIsRemainingGood(amount, actual, budgetType);

  const headerLabel = isEditEnabled ? 'Edit category' : avatar.emoji + ' ' + label;

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

  const deleteCategoryCb = () => {
    if (!category.id) return;

    setIsCategorySaving(true);
    categoryApi
      .DeleteCategory(category.id)
      .then((res) => {
        dispatch(setCategories(res.categories));
      })
      .finally(() => {
        setIsCategorySaving(false);
        closeCb();
      });
  };

  const toggleDeleteDialog = () => {
    setShowDeleteDialog(!showDeleteDialog);
  };

  return (
    <DialogContainer
      forwardRef={ref}
      {...props}
      editCb={toggleEdit}
      enableFooter={isEditEnabled}
      deleteButton={isEditEnabled}
      headerText={headerLabel}
      successCb={saveCategory}
      deleteCb={toggleDeleteDialog}
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
        <>
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
            <Styles.remainingInfoBlock $isGood={String(isRemainingGood)}>
              <h2>Remaining</h2>
              <h3>{formatAsMoney(remaining, true)}</h3>
            </Styles.remainingInfoBlock>
          </Styles.detailsContainer>
          <Styles.transactionListContainer id="dialog-list-container">
            <h2>Transactions</h2>
            {isTransactionsFetching && <LoadingComponent />}
            {!isTransactionsFetching && transactions.length === 0 && <div>No transactions</div>}
            {!isTransactionsFetching && transactions.length > 0 && (
              <TransactionList transactions={filterTransactions()} />
            )}
          </Styles.transactionListContainer>
        </>
      )}
      {showDeleteDialog && (
        <DestroyDialog
          topText={'Delete category'}
          bottomText={
            'Are you sure you want to delete this category? This action cannot be undone.'
          }
          successCb={deleteCategoryCb}
          closeCb={toggleDeleteDialog}
        />
      )}
    </DialogContainer>
  );
};

const baseInfoBlockStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
  border-radius: 0.8rem;
  margin: 0;

  h2 {
    color: ${colors.grey[700]};
  }

  h3 {
    font-weight: 600;
  }
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
    margin-bottom: 1rem;
    background-color: ${colors.grey[100]};
    padding: 0.6rem;
    border-radius: 0.8rem;
    margin-top: 1rem;

    hr {
      border: 1px solid ${colors.black.light};
      border-radius: 2px;
      width: 100%;
    }
  `,
  infoBlock: styled.div`
    ${baseInfoBlockStyles}
  `,
  remainingInfoBlock: styled.div<{ $isGood: string }>`
    ${baseInfoBlockStyles}

    h3,
    h2 {
      color: ${(props) =>
        props.$isGood === 'true' ? colors.success.main : colors.error.main} !important;
    }

    h3 {
      background-color: ${(props) =>
        props.$isGood === 'true' ? colors.success.focus : colors.error.focus} !important;
      border-radius: 30px;
      padding: 6px 10px;
    }
  `,
  transactionListContainer: styled.div`
    position: relative;
    max-height: 40vh;
    overflow-y: auto;
    overflow-x: hidden;
    width: calc(100% + 60px);

    h2 {
      font-size: 16px;
      font-weight: 600;
      color: ${colors.black.main};
      margin: 1rem;
    }
  `,
};
