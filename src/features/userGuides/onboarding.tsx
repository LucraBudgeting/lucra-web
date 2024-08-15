import { useEffect, useState } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { useDispatch } from 'react-redux';
import { setIsInTour } from '@/stores/slices/Dashboard.slice';
import colors from '@/assets/theme/colors';

const hasOnboarded = false;

const steps: Step[] = [
  {
    target: '#settings_cog_budget_header_icon',
    title: 'Add an account',
    content: 'You need to add a bank account to get started.',
    placement: 'bottom',
  },
  {
    target: '#settings_accounts',
    content: 'Open Accounts',
    placement: 'right',
  },
  {
    target: '#plaid_add_account_btn',
    content: 'Click here to add an account',
    placement: 'right',
  },
];

export function OnboardingGuide() {
  const [run, setRun] = useState(!hasOnboarded);
  const [stepIndex, setStepIndex] = useState(0);
  const dispatch = useDispatch();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type, action } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED, STATUS.ERROR, STATUS.IDLE];

    // @ts-expect-error - TS doesn't know about the STATUS enum
    if (finishedStatuses.includes(status)) {
      setRun(false);
      return;
    }

    if (action === 'prev') {
      console.log('Joyride callback:', data);

      setStepIndex((prevIndex) => prevIndex - 1);
      return;
    }

    if (type === 'step:after' && action === 'next') {
      if (steps.length === stepIndex + 1) {
        setRun(false);
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

  useEffect(() => {
    dispatch(setIsInTour(run));
  }, [run]);

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
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: colors.brand.main,
          textColor: colors.brand.dark,
          backgroundColor: '#FFFFFF',
          overlayColor: 'rgba(0, 0, 0, 0.65)',
        },
        overlay: {
          zIndex: 9999,
        },
        tooltip: {
          zIndex: 10001,
        },
        buttonBack: {
          display: 'none',
        },
        buttonClose: {
          display: 'none',
        },
      }}
    />
  );
}
