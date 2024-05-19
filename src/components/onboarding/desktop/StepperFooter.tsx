import { FC } from 'react';
import styled from 'styled-components';
import { BackArrow } from '@/assets/back-arrow';
import { ForwardArrow } from '@/assets/forward-arrow';
import { Button } from '@/atoms/button/Button';
import { onboardingSelector } from '@/stores/slices/Onboarding.slice';

interface StepperFooterProps {
  prevPage: () => void;
  nextPage: () => void;
  isFirstPage?: boolean;
  isLastPage?: boolean;
}

export const StepperFooter: FC<StepperFooterProps> = ({
  prevPage,
  nextPage,
  isFirstPage,
  isLastPage,
}) => {
  const { isCurrentPageDisabled } = onboardingSelector();

  return (
    <Styled.stepperFooter id="stepper-footer">
      {isFirstPage ? (
        <span></span>
      ) : (
        <Button onClick={prevPage} primary={false}>
          <BackArrow /> Back
        </Button>
      )}
      <Button onClick={nextPage} primary={false} disabled={isCurrentPageDisabled}>
        {isLastPage ? 'Finish' : 'Continue'} <ForwardArrow />
      </Button>
    </Styled.stepperFooter>
  );
};

const Styled = {
  stepperFooter: styled.div`
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 58px;
  `,
};
