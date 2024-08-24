import { FC } from 'react';
import Joyride, { Step, TooltipRenderProps } from 'react-joyride';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';
import { guideStyles } from './guide.styles';

interface LucraJoyrideProps {
  run: boolean;
  steps: Step[];
  stepIndex: number;
  handleJoyrideCallback: (data: any) => void;
}

export const LucraJoyride: FC<LucraJoyrideProps> = ({
  run,
  steps,
  stepIndex,
  handleJoyrideCallback,
}) => {
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
