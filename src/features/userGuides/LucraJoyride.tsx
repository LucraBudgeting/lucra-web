import { FC, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step, TooltipRenderProps } from 'react-joyride';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';
import { guideStyles } from './guide.styles';

interface LucraJoyrideProps {
  run: boolean;
  steps: Step[];
  markGuideAsComplete?: () => void;
  setRun?: (val: boolean) => void;
}

export const LucraJoyride: FC<LucraJoyrideProps> = ({
  run,
  steps,
  markGuideAsComplete,
  setRun,
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type, action } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED, STATUS.ERROR, STATUS.IDLE];

    // @ts-expect-error - TS doesn't know about the click method
    if (finishedStatuses.includes(status)) {
      setRun && setRun(false);
      return;
    }

    if (action === 'prev') {
      setStepIndex((prevIndex) => prevIndex - 1);
      return;
    }

    if (type === 'step:after' && action === 'next') {
      if (steps.length === stepIndex + 1) {
        markGuideAsComplete && markGuideAsComplete();
      }

      const querySelector = steps[index].target as string;
      const element = document.querySelector(querySelector);
      if (element) {
        // @ts-expect-error - TS doesn't know about the click method
        element.click();
      }

      if (steps.length > index + 1) {
        nextStep(steps[index + 1].target as string);
      }
      return;
    }

    function nextStep(nextQuerySelector: string) {
      const element = document.querySelector(nextQuerySelector);
      if (element) {
        setStepIndex((prevIndex) => prevIndex + 1);
      } else {
        setTimeout(() => {
          nextStep(nextQuerySelector);
        }, 10);
      }
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      disableOverlayClose
      disableScrolling
      styles={guideStyles}
      tooltipComponent={(props) => <LucraJoyrideTooltip {...props} totalSteps={steps.length} />}
    />
  );
};

interface LucraJoyrideTooltipProps extends TooltipRenderProps {
  totalSteps: number;
}

export const LucraJoyrideTooltip: FC<LucraJoyrideTooltipProps> = ({
  continuous,
  index,
  step,
  primaryProps,
  tooltipProps,
  totalSteps,
}) => {
  return (
    <Styled.tooltipBody {...tooltipProps}>
      <Styled.title>{step.title}</Styled.title>
      <Styled.content>{step.content}</Styled.content>
      <Styled.footer>
        <p>
          Step {index + 1} of {totalSteps}
        </p>
        <Styled.button {...primaryProps}>{continuous ? 'Next' : 'Got it!'}</Styled.button>
      </Styled.footer>
    </Styled.tooltipBody>
  );
};

const Styled = {
  tooltipBody: styled.div`
    background-color: ${colors.white.main};
    padding: 16px;
    border-radius: 12px;
    min-width: 300px;
  `,
  title: styled.h1`
    font-weight: 600;
    font-size: 1.25rem;
    color: ${colors.black.main};
  `,
  content: styled.p`
    font-weight: 400;
    font-size: 14px;
    color: ${colors.grey[700]};
    margin-bottom: 2rem;
  `,
  footer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      color: ${colors.grey[700]};
    }
  `,
  button: styled.button`
    padding: 12px 20px;
    border-radius: 8px;
    background-color: ${colors.black.main};
    box-shadow: none;
    border-color: transparent;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: ${colors.black.focus};
    }

    &:focus {
      outline: none;
    }
  `,
};
