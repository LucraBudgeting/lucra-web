import styled from 'styled-components';
import colors from '@/assets/theme/colors';

export const Styles = {
  tableContainer: styled.div`
    width: 100%;
    max-height: 90vh;
    overflow-y: scroll;
  `,
  tableHeader: styled.div`
    width: 40%;
    display: flex;
    justify-content: flex-end;
    gap: 24px;
    min-width: 600px;
    padding-right: 8px;

    @media (max-width: 600px) {
      min-width: 60%;
      max-width: 70%;
    }

    p {
      width: 30%;
      text-align: right;
    }
  `,
  sectionRows: styled.div`
    /* max-height: 35vh; */
    overflow-y: auto;

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
  `,
  netRowContainer: styled.div`
    position: sticky;
    bottom: 0;
    background-color: ${colors.light.main};
    padding: 0;
  `,
  sectionHeader: styled.div<{ $isFirst?: boolean }>`
    position: sticky;
    top: ${(props) => (props.$isFirst ? '0' : '0')};
    z-index: ${(props) => (props.$isFirst ? 9 : 8)};
    background-color: ${colors.grey[100]};
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;

    border-bottom: 2px solid #333333;
    cursor: pointer;

    .section-title {
      user-select: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;

      svg {
        margin-left: 2px;
      }
    }

    p {
      font-size: 18px;
      font-weight: 600;
      line-height: 22px;
      cursor: pointer;
    }
  `,
  sectionTotalsContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 8px;
    width: 40%;
    min-width: 600px;
    gap: 24px;

    @media (max-width: 600px) {
      min-width: 60%;
      max-width: 70%;
    }
  `,
  sectionTotal: styled.p<{ $isGood?: string }>`
    color: ${(props) => {
      if (!props.$isGood) return '#333333';
      return props.$isGood === 'true' ? colors.success.main : colors.error.main;
    }};
    font-weight: 600;
    width: 30%;
    text-align: right;
  `,
  budgetSection: styled.div``,
  headerContainer: styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${colors.grey[100]};
    z-index: 10;

    position: sticky;
    top: 0;

    user-select: none;

    p {
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      text-align: right;
      color: #9b9b9b;
    }
  `,
  budgetsContainer: styled.div``,
};
