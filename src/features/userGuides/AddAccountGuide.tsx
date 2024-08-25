import { useContext, useEffect, useState } from 'react';
import { Step } from 'react-joyride';
import { useDispatch } from 'react-redux';
import { setIsInTour } from '@/stores/slices/Dashboard.slice';
import { useUserGuide } from '@/hooks/guide/useUserGuide.hook';
import { ApiContext } from '@/stores/contexts/api.context';
import { markGuideAsCompleted } from '@/stores/slices/userGuide.slice';
import { LucraJoyride } from './LucraJoyride';

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
    title: 'Open Accounts',
    content: '',
    placement: 'right',
  },
  {
    target: '#plaid_add_account_btn',
    title: 'Click here to add an account',
    content: '',
    placement: 'right',
  },
];

const addAccountGuideKey = 'AddingAnAccount';

export function AddAccountGuide() {
  const [run, setRun] = useState(false);

  const apis = useContext(ApiContext);
  const { progress, guides } = useUserGuide();
  const guideId = guides.find((guide) => guide.key === addAccountGuideKey)?.id;

  const dispatch = useDispatch();

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
    apis.userGuideApi.markGuideAsComplete(guideId).then(() => {
      dispatch(markGuideAsCompleted(guideId));
      setRun(false);
    });
  }

  return (
    <LucraJoyride
      run={run}
      steps={steps}
      markGuideAsComplete={markGuideAsComplete}
      setRun={setRun}
    />
  );
}
