import styled from 'styled-components';

export const Styles = {
  tableContainer: styled.div`
    width: 100%;
  `,
  tableHeader: styled.div`
    width: 40%;
    display: flex;
    justify-content: flex-end;
    gap: 24px;
    min-width: 600px;

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
    max-height: 35vh;
    overflow-y: auto;

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
  `,
  sectionHeader: styled.div`
    padding-top: 2rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;

    border-bottom: 2px solid #333333;
    cursor: pointer;

    .section-title {
      user-select: none;

      svg {
        margin-left: 1rem;
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
  sectionTotal: styled.p<{ isremaininggood?: string }>`
    color: ${(props) => {
      if (!props.isremaininggood) return '#333333';
      return props.isremaininggood === 'true' ? '#2AA64C' : '#CA4141';
    }};
    font-weight: 600;
    width: 30%;
    text-align: right;
  `,
  budgetSection: styled.div``,
  headerContainer: styled.div`
    display: flex;
    justify-content: space-between;

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