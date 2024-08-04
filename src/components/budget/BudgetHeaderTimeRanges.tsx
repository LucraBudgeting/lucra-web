import { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  budgetHeaderTimeRanges,
  dashboardSelector,
  setNewRange,
} from '@/stores/slices/Dashboard.slice';

interface BudgetHeaderTimeRangesProps {}

export const BudgetHeaderTimeRanges: FC<BudgetHeaderTimeRangesProps> = ({}) => {
  const dispatch = useDispatch();
  const { currentRange } = dashboardSelector();

  function handleTimeRangeChange(range: budgetHeaderTimeRanges) {
    dispatch(setNewRange(range));
  }

  return (
    <Styled.container>
      <Styled.timeBtn
        active={(currentRange == '1mo').toString()}
        onClick={() => handleTimeRangeChange('1mo')}
      >
        1mo
      </Styled.timeBtn>
      <Styled.timeBtn
        active={(currentRange == '6mo').toString()}
        onClick={() => handleTimeRangeChange('6mo')}
      >
        6mo
      </Styled.timeBtn>
      <Styled.timeBtn
        active={(currentRange == '12mo').toString()}
        onClick={() => handleTimeRangeChange('12mo')}
      >
        12mo
      </Styled.timeBtn>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    width: 180px;
    height: 30px;
    gap: 0px;
    border-radius: 8px;
    opacity: 0px;
    border: 1px solid #e2e2e2;
    display: flex;
    user-select: none;
  `,
  timeBtn: styled.div<{ active: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33%;
    height: 100%;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    background-color: ${({ active }) => (active === 'true' ? '#a9a9a968' : 'transparent')};
    color: ${({ active }) => (active === 'true' ? '#333333' : '#707070')};

    &:not(:first-child):not(:last-child) {
      border-left: 1px solid #e2e2e2;
      border-right: 1px solid #e2e2e2;
    }

    &:first-child {
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
    }

    &:last-child {
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
    }

    &:hover {
      cursor: pointer;
      background-color: #a9a9a91d;
      color: #333333;
    }
  `,
};
