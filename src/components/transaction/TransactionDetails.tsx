import { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useDispatch } from 'react-redux';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useTransaction } from '@/hooks/dashboard/useTransaction.hook';
import { dashboardSelector, setTransactions } from '@/stores/slices/Dashboard.slice';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import colors from '@/assets/theme/colors';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { toLongDateFormat } from '@/utils/time.helper';
import { getBase64ImageString } from '@/utils/base64Img';
import { BaseSelect, ISelectOptionGroup } from '@/atoms/select/BaseSelect';
import { BaseToggle } from '@/atoms/toggle/BaseToggle';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { ApiContext } from '@/stores/contexts/api.context';
import { categoriesToGroups } from '../category/category.utils';

interface TransactionDetailsProps extends DialogProps {
  id: string;
}

export const TransactionDetails: FC<TransactionDetailsProps> = (props) => {
  const [containerRef] = useAutoAnimate();
  const { transactionApi } = useContext(ApiContext);
  const { bankAccounts, debitCategories, creditCategories, transferCategory, dateRange } =
    dashboardSelector();
  const dispatch = useDispatch();
  const [cacheBuster, setCacheBuster] = useState('');
  const [transaction, isFetching] = useTransaction(props.id, cacheBuster);

  const [isExcluded, setIsExcluded] = useState(false);
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [categoryOptionList, setCategoryOptionList] = useState<ISelectOptionGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(transaction?.categoryId ?? '');

  let bankAccount = {} as IBankAccount;

  useEffect(() => {
    setCategoryOptionList(categoriesToGroups(debitCategories, creditCategories, transferCategory));
  }, [debitCategories, creditCategories]);

  useEffect(() => {
    setSelectedCategory(transaction?.categoryId ?? '');
    setIsExcluded(transaction?.isExcludedFromBudget ?? false);
  }, [transaction]);

  if (transaction?.accountId) {
    bankAccount = bankAccounts[transaction.accountId];
  }

  function onCategoryChange(updatedValue: string): void {
    setSelectedCategory(updatedValue);
  }

  function toggleDetails() {
    setIsShowingDetails(!isShowingDetails);
  }

  function onExcludedChange(updatedValue: boolean) {
    setIsExcluded(updatedValue);
  }

  async function saveTransaction() {
    await transactionApi
      .PatchTransaction(props.id, {
        categoryId: selectedCategory,
        excludeFromBudget: isExcluded,
      })
      .then(() => {
        setCacheBuster(new Date().getTime().toString());
      });

    await transactionApi
      .GetTransactions(dateRange.startDate, dateRange.endDate)
      .then((response) => {
        dispatch(setTransactions(response.transactions));
      });
  }

  return (
    <DialogContainer
      {...props}
      enableHeader={true}
      enableFooter={true}
      headerText={transaction?.merchantName || 'Transaction Details'}
      successCb={saveTransaction}
      closeCb={props.closeCb}
    >
      <Styled.container ref={containerRef}>
        {isFetching ? (
          <LoadingComponent />
        ) : (
          <>
            <Styled.header>
              <p>{transaction?.name}</p>
              <h2>{formatAsMoney(-(transaction?.amount ?? 0), true)}</h2>
              <p>{toLongDateFormat(transaction?.date)}</p>
            </Styled.header>
            <Styled.accountContainer>
              <h3>Account</h3>
              <span>
                <img srcSet={getBase64ImageString(bankAccount?.bankInstitution?.logoUrl)} />
                <div className="bankDetails">
                  <span className="top">
                    <p>{bankAccount?.bankInstitution?.name}</p>
                    <p>{bankAccount.mask}</p>
                  </span>
                  <p className="bottom">{bankAccount?.accountName}</p>
                </div>
              </span>
            </Styled.accountContainer>
            <Styled.categorySelectContainer>
              <h3>Category</h3>
              <BaseSelect
                onValueChange={onCategoryChange}
                groups={categoryOptionList}
                value={selectedCategory}
              />
            </Styled.categorySelectContainer>
            <Styled.excludeTransaction>
              <span>
                <h3>Exclude Transaction</h3>
                <p>Transaction will not show in Actuals</p>
              </span>
              <BaseToggle onValueChange={onExcludedChange} value={isExcluded} />
            </Styled.excludeTransaction>
            <Styled.details onClick={toggleDetails}>Details</Styled.details>
            {isShowingDetails && (
              <Styled.detailsContainer>
                <span>
                  <p>Payment Channel: </p>
                  <p>{transaction?.paymentChannel}</p>
                </span>
                <span>
                  <p>Pending: </p>
                  <p>{transaction?.pending ? 'True' : 'False'}</p>
                </span>
                <span>
                  <p>Primary Category:</p>
                  <p>{transaction?.categoryPrimary}</p>
                </span>
                <span>
                  <p>Category Detailed: </p>
                  <p>{transaction?.categoryDetailed}</p>
                </span>
              </Styled.detailsContainer>
            )}
          </>
        )}
      </Styled.container>
    </DialogContainer>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    margin-bottom: 2rem;
  `,
  header: styled.div`
    h2 {
      color: ${colors.black};
      font-weight: 600;
      font-size: 24px;
    }
    p {
      font-weight: 500;
      font-size: 14px;
      color: ${colors.grey[600]};
    }
  `,
  excludeTransaction: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    span {
      p {
        color: ${colors.grey[600]};
      }
    }
  `,
  accountContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h3 {
      font-weight: 600;
      color: ${colors.grey[600]};
    }
    span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;

      .bankDetails {
        display: flex;
        flex-direction: column;
        width: 100%;

        .top {
          width: 90%;
          display: flex;

          p:nth-child(2) {
            font-weight: 600;
            color: ${colors.grey[600]};
          }
        }

        .bottom {
          font-weight: 500;
          color: ${colors.grey[600]};
        }
      }
    }
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
  `,
  categorySelectContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      font-weight: 600;
      color: ${colors.grey[600]};
    }
  `,

  details: styled.p`
    text-decoration: underline;
    cursor: pointer;
    margin: none;
  `,
  detailsContainer: styled.div`
    margin-top: -1.5rem;

    span {
      display: flex;
      gap: 0.5rem;
      width: 100%;

      p {
        font-size: 14px;
        font-family: monospace;
        overflow-wrap: break-word;
      }

      p:nth-child(2) {
        font-weight: 500;
        color: ${colors.grey[600]};
      }
    }
  `,
};
