import { FC } from 'react';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { getBase64ImageString } from '@/utils/base64Img';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { accountTypes } from './AccountsDialog';
import { isBalanceOrAvailable } from './functions';

interface AccountItemProps {
  account: IBankAccount;
  type: accountTypes;
  onClick: (account: IBankAccount) => void;
}

export const AccountItem: FC<AccountItemProps> = ({ account, type, onClick }) => {
  const { bankInstitution, mask, accountName, accountBalance, id } = account;
  const amountType = isBalanceOrAvailable(account.type);

  return (
    <Styled.container id={`account-${type}-${id}`} onClick={() => onClick(account)}>
      <Styled.accountDetailsContainer>
        <img srcSet={getBase64ImageString(bankInstitution?.logoUrl)} />
        <Styled.accountNameContainer>
          {accountName && accountName.toLowerCase() !== 'unknown' && <p>{accountName}</p>}
          <div>
            <p>{bankInstitution?.name}</p>
            <p>({mask})</p>
          </div>
        </Styled.accountNameContainer>
      </Styled.accountDetailsContainer>
      <Styled.accountBalanceContainer>
        {type === 'credit' ? (
          <h1>
            {formatAsMoney(accountBalance?.currentBalance ?? 0)} /
            {formatAsMoney(accountBalance?.limit ?? 0)}
          </h1>
        ) : (
          <h1>{formatAsMoney(accountBalance?.availableBalance ?? 0)}</h1>
        )}
        <p>{amountType}</p>
      </Styled.accountBalanceContainer>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    background-color: ${colors.grey[100]};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 98px;
    padding: 0 16px;
    cursor: pointer;
    transition: background-color 0.25s ease-in-out;

    &:hover {
      background-color: ${colors.grey[200]};
    }
  `,
  accountDetailsContainer: styled.div`
    display: flex;
    max-width: 80%;
    gap: 8px;
    img {
      max-height: 50px;
      max-width: 50px;
    }
  `,
  accountNameContainer: styled.div`
    max-width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p:nth-child(1) {
      font-weight: 500;
      color: ${colors.black.main};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }

    div {
      display: flex;
      p {
        font-weight: 400;
        color: ${colors.grey[500]};
      }

      p:nth-child(1) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `,
  accountBalanceContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    h1 {
      font-weight: 600;
      color: ${colors.black.main};
      font-size: 16px;
      text-align: right;
    }
    p {
      font-weight: 500;
      color: ${colors.grey[500]};
      font-size: 12px;
    }
  `,
};
