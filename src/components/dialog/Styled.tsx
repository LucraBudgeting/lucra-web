import styled, { css } from 'styled-components';
import { CurrencyInput } from '@/atoms/input/CurrencyInput';

const inputStyles = css<{ isempty?: string }>`
  color: ${({ isempty }) => (isempty === 'true' ? '#9B9B9B' : '#333')};

  text-align: center;

  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  background-color: transparent;
  border: none;
  width: 100%;
  padding: 14px;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Styled = {
  container: styled.div`
    width: 100%;
  `,
  transactionContainer: styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    h4 {
      color: var(--Black-100, #000);
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 125% */
    }
  `,
  sectionContainer: styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  `,
  section: styled.section<{ type?: 'warning' | 'success' }>`
    flex: 1;
    display: flex;
    padding: 24px 20px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    border-radius: 16px;
    background: ${({ type }) => {
      switch (type) {
        case 'warning':
          return '#FFE9E9';
        case 'success':
          return '#d4fade';
        default:
          return '#f9f9f9';
      }
    }};
  `,
  sectionInput: styled.input<{ isempty?: string }>`
    ${inputStyles}
  `,
  sectionCurrencyInput: styled(CurrencyInput)<{ isempty?: string }>`
    ${inputStyles}
  `,
};

export { Styled };
