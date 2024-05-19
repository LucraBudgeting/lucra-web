import { FC } from 'react';
import styled from 'styled-components';
import { BackArrow } from '@/assets/back-arrow';
import { ForwardArrow } from '@/assets/forward-arrow';
import { Button } from '@/atoms/button/Button';

interface StepperFooterProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const StepperFooter: FC<StepperFooterProps> = ({ prevPage, nextPage }) => {
  return (
    <Styled.stepperFooter id="stepper-footer">
      <Button onClick={prevPage} primary={false}>
        <BackArrow /> Back
      </Button>
      <Button onClick={nextPage} primary={false}>
        Continue <ForwardArrow />
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
