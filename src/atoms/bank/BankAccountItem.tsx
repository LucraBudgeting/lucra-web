import { FC } from 'react';
import styled from 'styled-components';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { getBase64ImageString } from '@/utils/base64Img';

interface BankAccountItemProps {
  account: IBankAccount;
}

export const BankAccountItem: FC<BankAccountItemProps> = ({ account }) => {
  const { bankInstitution: bank } = account;
  return (
    <Styles.container>
      <Styles.left>
        <Styles.avatar outline={bank?.primaryColor}>
          <img src={getBase64ImageString(bank?.logo)} />
        </Styles.avatar>
        <Styles.titleContainer>
          <h3>{account.institutionDisplayName}</h3>
          <h6>{bank?.name}</h6>
        </Styles.titleContainer>
      </Styles.left>

      <Styles.mask>
        <p>...{account.mask}</p>
      </Styles.mask>
    </Styles.container>
  );
};

const Styles = {
  container: styled.div`
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    border-radius: 16px;
    border: 1px solid #e2e2e2;

    max-height: 80px;
  `,
  left: styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
  `,
  avatar: styled.div<{ outline?: string }>`
    width: 43px;
    height: 43px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: solid 1px ${(props) => props.outline ?? 'grey'};

    border-radius: calc(43px / 2);
    flex-shrink: 0;
    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  `,
  titleContainer: styled.div`
    h3 {
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }

    h6 {
      color: #707070;
      font-size: 12px;
      font-weight: 500;
    }
  `,
  mask: styled.div`
    p {
      color: #707070;
      font-size: 14px;
      font-weight: 500;
    }
  `,
};
