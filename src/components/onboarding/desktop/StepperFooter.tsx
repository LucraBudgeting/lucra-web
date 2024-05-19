import { FC } from 'react';
import styled from 'styled-components';
import { BackArrow } from '@/assets/back-arrow';
import { ForwardArrow } from '@/assets/forward-arrow';
import { Button } from '@/atoms/button/Button';
import { onboardingSelector } from '@/stores/slices/Onboarding.slice';

interface StepperFooterProps {
  prevPage: () => void;
  nextPage: () => void;
  isLastPage?: boolean;
}

export const StepperFooter: FC<StepperFooterProps> = ({ prevPage, nextPage, isLastPage }) => {
  const { isCurrentPageDisabled, isNextStepLoading } = onboardingSelector();

  return (
    <Styled.stepperFooter id="stepper-footer">
      <Button onClick={prevPage} primary={false}>
        <BackArrow /> Back
      </Button>
      <Button
        onClick={nextPage}
        primary={false}
        disabled={isNextStepLoading || isCurrentPageDisabled}
      >
        {isNextStepLoading ? 'Loading...' : isLastPage ? 'Finish' : 'Continue'} <ForwardArrow />
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
