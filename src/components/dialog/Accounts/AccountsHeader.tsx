import { FC } from 'react';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';
import { formatAsMoney } from '../../../utils/formatAsMoney';

interface AccountsHeaderProps {
  totalDepository: number;
  totalDebts: number;
}

export const AccountsHeader: FC<AccountsHeaderProps> = ({
  totalDepository: totalAssets,
  totalDebts,
}) => {
  const netWorth = totalAssets - totalDebts;

  return (
    <Styled.container>
      <Styled.worthBlock>
        <p>Total Assets</p>
        <h1>{formatAsMoney(totalAssets)}</h1>
      </Styled.worthBlock>
      <Styled.worthBlock>
        <p>Total Debt</p>
        <h1>{formatAsMoney(totalDebts)}</h1>
      </Styled.worthBlock>
      <Styled.worthBlock>
        <p>Net Worth</p>
        <h1 style={{ color: netWorth >= 0 ? colors.success.main : colors.error.main }}>
          {formatAsMoney(netWorth)}
        </h1>
      </Styled.worthBlock>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,
  worthBlock: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;

    p {
      color: ${colors.grey[500]};
      font-weight: 500;
      font-size: 12px;
      margin: 0;
    }

    h1 {
      font-size: 24px;
      font-weight: 600;
      color: ${colors.black.main};
      margin: 0;
    }
  `,
};
