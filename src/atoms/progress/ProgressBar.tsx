import { FC } from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  totalPages: number;
  currentPage: number;
}

const height = '2px';

export const ProgressBar: FC<ProgressBarProps> = ({ totalPages, currentPage }) => {
  const getProgressWidth = () => {
    return (currentPage / totalPages) * 100;
  };

  return (
    <Styled.container>
      <Styled.stepText>
        <Styled.stepTextPrimary>Step {currentPage}</Styled.stepTextPrimary>
        <Styled.stepTextSecondary> of {totalPages}</Styled.stepTextSecondary>
      </Styled.stepText>
      <Styled.progressBar>
        <Styled.filledBar width={`${getProgressWidth()}%`} />
      </Styled.progressBar>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  `,
  stepText: styled.div`
    width: 90%;
    display: flex;
    gap: 4px;

    h3 {
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px;
    }
  `,
  stepTextPrimary: styled.h3`
    color: #333;
  `,
  stepTextSecondary: styled.h3`
    color: #b7b7b7;
  `,
  progressBar: styled.div`
    width: 100%;
    background-color: #e0e0e0;
    height: ${height};
  `,
  filledBar: styled.div<{ width: string }>`
    width: ${(props) => props.width};
    height: ${height};
    background-color: #333333;

    transition: width 0.25s ease-in-out;
  `,
};
