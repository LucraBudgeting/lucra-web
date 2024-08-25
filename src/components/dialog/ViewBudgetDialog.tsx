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
import { getShortMonth, yearFromIso } from '@/utils/time.helper';
import { TransactionList } from '../transaction/TransactionList';
import { EditOrAddCategory } from '../budget/EditOrAddCategory';
import { DestroyDialog } from './Destroy/DestroyDialog';

interface ViewBudgetDialogProps extends DialogProps {
  category: ICategory;
  amount?: number;
  isRemainingGood?: boolean;
  remaining?: number;
  actual?: number;
  average?: number;
}

export const ViewBudgetDialog: FC<ViewBudgetDialogProps> = (props) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [transactions, isTransactionsFetching] = useTransactions();
  const [category, setCategory] = useState<ICategory>(props.category);
  const [isCategorySaving, setIsCategorySaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const dispatch = useDispatch();
  const { categoryApi } = useContext(ApiContext);
  const { closeCb, amount = 0, isRemainingGood, remaining = 0, actual = 0, average = 0 } = props;
  const { id, label, avatar } = category;
  const { dateRange, currentRange } = dashboardSelector();
  const isAggregate = currentRange !== '1mo';
  let startDateStr = `${getShortMonth(dateRange.endDate)} ${yearFromIso(dateRange.endDate)}`;
  if (currentRange !== '1mo') {
    startDateStr = `${getShortMonth(dateRange.startDate)} ${yearFromIso(dateRange.startDate)} - ${getShortMonth(dateRange.endDate)} ${yearFromIso(dateRange.endDate)}`;
  }

  const filterTransactions = () =>
    transactions.filter((transaction) => transaction.categoryId === id);

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
          <Styles.dateContainer>
            <h2>{startDateStr}</h2>
          </Styles.dateContainer>
          {isAggregate ? (
            <Styles.aggregateContainer>
              <Styles.aggregateBlock>
                <h2>Total</h2>
                <h1>{formatAsMoney(actual, true)}</h1>
              </Styles.aggregateBlock>
              <Styles.aggregateBlock>
                <h2>Average</h2>
                <h1>{formatAsMoney(average, true)}</h1>
              </Styles.aggregateBlock>
            </Styles.aggregateContainer>
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
              <Styles.remainingInfoBlock $isGood={String(isRemainingGood)}>
                <h2>Remaining</h2>
                <h3>{formatAsMoney(remaining, true)}</h3>
              </Styles.remainingInfoBlock>
            </Styles.detailsContainer>
          )}
          <Styles.transactionHeader>
            <h2>Transactions</h2>
          </Styles.transactionHeader>
          <Styles.transactionListContainer id="dialog-list-container">
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
  dateContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 1rem;

    h2 {
      font-weight: 600;
    }
  `,
  aggregateContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
  `,
  aggregateBlock: styled.div`
    background-color: ${colors.grey[100]};
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 20px;
    border-radius: 16px;

    h1 {
      color: ${colors.black.main};
      font-size: 20px;
      font-weight: 600;
    }

    h2 {
      color: ${colors.grey[500]};
      font-size: 14px;
      font-weight: 500;
    }
  `,
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
  transactionHeader: styled.div`
    width: 100%;

    h2 {
      font-size: 16px;
      font-weight: 600;
      color: ${colors.black.main};
      margin: 1rem;
    }
  `,
  transactionListContainer: styled.div`
    position: relative;
    max-height: 40vh;
    overflow-y: auto;
    overflow-x: hidden;
    width: calc(100% + 60px);
    margin-bottom: 18px;
  `,
};
