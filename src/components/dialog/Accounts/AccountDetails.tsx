import { FC } from 'react';
import styled from 'styled-components';
import { Transactions } from '@/features/dashboard/components/Transactions';
import { useAccountTransactions } from '@/hooks/dashboard/useAccountTransactions.hook';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { getBase64ImageString } from '@/utils/base64Img';
import { ElipsesIcon } from '@/assets/elipses-icon';
import colors from '@/assets/theme/colors';
import { RefreshOutline } from '@/assets/refresh-outline';
import { LinkPlaid } from '@/components/bank/plaid/Link.Plaid';
import { formatAsMoney } from '../../../utils/formatAsMoney';
import { isBalanceOrAvailable } from './functions';

interface AccountDetailsProps {
  account: IBankAccount;
}

const showMenu = false;

export const AccountDetails: FC<AccountDetailsProps> = ({ account }) => {
  const { bankInstitution, id, accountBalance, mask, type } = account;
  const amountType = isBalanceOrAvailable(type);
  const [transactions, isFetching] = useAccountTransactions(id);

  const isCredit = type?.toLowerCase()?.includes('credit');

  return (
    <Styled.container>
      <Styled.headerRow $color={bankInstitution?.primaryColor}>
        <span>
          <img srcSet={getBase64ImageString(bankInstitution?.logoUrl)} />
          <Styled.headerTitle>
            {bankInstitution?.name} ({mask})
            {account.itemId && (
              <LinkPlaid mode="update" itemId={account.itemId}>
                <span style={{ cursor: 'pointer' }}>
                  <RefreshOutline />
                </span>
              </LinkPlaid>
            )}
          </Styled.headerTitle>
        </span>
        {showMenu && <ElipsesIcon />}
      </Styled.headerRow>
      <Styled.balanceContainer>
        {isCredit ? (
          <h1>
            {formatAsMoney(accountBalance?.currentBalance ?? 0)}/
            {formatAsMoney(accountBalance?.limit ?? 0)}
          </h1>
        ) : (
          <h1>{formatAsMoney(accountBalance?.availableBalance ?? 0)}</h1>
        )}
        <p>{amountType}</p>
      </Styled.balanceContainer>
      {/* <Styled.tabs>
        <h3>Transactions</h3>
      </Styled.tabs> */}
      <Styled.transactionContainer>
        <Transactions transactions={transactions} isFetching={isFetching} />
      </Styled.transactionContainer>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  `,
  headerRow: styled.div<{ $color?: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    span {
      display: flex;
      align-items: center;
      gap: 1rem;

      h2 {
        font-weight: 500;
        font-size: 14px;
      }

      img {
        max-height: 40px;
        max-width: 40px;
        border: solid 2px ${(props) => props.$color};
        padding: 4px;
        border-radius: 50%;
      }
    }
  `,
  balanceContainer: styled.div`
    h1 {
      font-weight: 700;
      font-size: 28px;
    }

    p {
      font-weight: 500;
      color: ${colors.grey[500]};
    }
  `,
  tabs: styled.div``,
  transactionContainer: styled.div`
    height: 400px;
    width: 100%;
  `,
  headerTitle: styled.h2`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    font-size: 14px;
  `,
};
