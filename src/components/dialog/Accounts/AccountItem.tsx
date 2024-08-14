import colors from '@/assets/theme/colors';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { getBase64ImageString } from '@/utils/base64Img';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { FC } from 'react';
import styled from 'styled-components';

interface AccountItemProps {
  account: IBankAccount;
}

export const AccountItem: FC<AccountItemProps> = ({ account }) => {
  const { bankInstitution, mask, accountName, accountBalance } = account;
  let amountType;
  switch (account.type?.toLowerCase()) {
    case 'checking':
    case 'savings':
      amountType = 'Balance';
      break;
    case 'loan':
    case 'creditcard':
      amountType = 'available';
      break;
    default:
      amountType = '';
  }

  return (
    <Styled.container>
      <Styled.accountDetailsContainer>
        <img srcSet={getBase64ImageString(bankInstitution?.logoUrl)} />
        <Styled.accountNameContainer>
          <p>{accountName}</p>
          <div>
            <p>{bankInstitution?.name}</p>
            <p>({mask})</p>
          </div>
        </Styled.accountNameContainer>
      </Styled.accountDetailsContainer>
      <Styled.accountBalanceContainer>
        <h1>{formatAsMoney(accountBalance?.currentBalance ?? 0)}</h1>
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
    max-width: 80%;
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
    }
    p {
      font-weight: 500;
      color: ${colors.grey[500]};
      font-size: 12px;
    }
  `,
};
