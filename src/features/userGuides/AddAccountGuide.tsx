import { useContext, useEffect, useState } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { useDispatch } from 'react-redux';
import { setIsInTour } from '@/stores/slices/Dashboard.slice';
import colors from '@/assets/theme/colors';
import { useUserGuide } from '@/hooks/guide/useUserGuide.hook';
import { ApiContext } from '@/stores/contexts/api.context';

const steps: Step[] = [
  {
    target: '#settings_cog_budget_header_icon',
    title: 'Add an account',
    content: 'To get started you need to add an account',
    placement: 'bottom',
    disableBeacon: true,
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

const addAccountGuideKey = 'AddingAnAccount';

export function AddAccountGuide() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const apis = useContext(ApiContext);
  const { progress, guides } = useUserGuide();
  const guideId = guides.find((guide) => guide.key === addAccountGuideKey)?.id;

  const dispatch = useDispatch();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type, action } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED, STATUS.ERROR, STATUS.IDLE];

    // @ts-expect-error - TS doesn't know about the click method
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
        markGuideAsComplete();
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

  useEffect(() => {
    if (!guideId) return;

    const guideProgress = progress[guideId];

    if (!guideProgress?.completed) {
      setRun(true);
    }
  }, []);

  function markGuideAsComplete() {
    if (!guideId) return;

    setRun(false);
    apis.userGuideApi.markGuideAsComplete(guideId);
  }

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
