import { FC, useContext, useEffect, useState } from 'react';
import { Step } from 'react-joyride';
import { useDispatch } from 'react-redux';
import { useUserGuide } from '@/hooks/guide/useUserGuide.hook';
import { ApiContext } from '@/stores/contexts/api.context';
import { dashboardSelector, setIsInTour } from '@/stores/slices/Dashboard.slice';
import { markGuideAsCompleted } from '@/stores/slices/userGuide.slice';
import { isObjEmpty } from '@/utils/deepEqualsComparison';
import { LucraJoyride } from './LucraJoyride';

interface AddBudgetGuideProps {}

const addAccountGuideKey = 'AddingAnAccount';
const addBudgetGuideKey = 'AddingABudget';

const steps: Step[] = [
  {
    target: '#add_new_budget_header_icon',
    title: 'Creating a budget',
    content: 'Click here to create a budget',
    placement: 'bottom',
    disableBeacon: true,
  },
];

export const AddBudgetGuide: FC<AddBudgetGuideProps> = ({}) => {
  const [run, setRun] = useState(false);
  const apis = useContext(ApiContext);
  const { progress, guides } = useUserGuide();
  const { bankAccounts } = dashboardSelector();
  const addAccountGuideId = guides.find((guide) => guide.key === addAccountGuideKey)?.id;
  const addBudgetGuideId = guides.find((guide) => guide.key === addBudgetGuideKey)?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsInTour(run));
  }, [run]);

  useEffect(() => {
    if (!addBudgetGuideId) return;
    if (!addAccountGuideId) return;

    const addAccountGuideProgress = progress[addAccountGuideId];
    const guideProgress = progress[addBudgetGuideId];

    if (
      !guideProgress?.completed &&
      addAccountGuideProgress?.completed &&
      !isObjEmpty(bankAccounts)
    ) {
      setRun(true);
    }
  }, [progress, bankAccounts]);

  function markGuideAsComplete() {
    if (!addBudgetGuideId) return;

    setRun(false);
    apis.userGuideApi.markGuideAsComplete(addBudgetGuideId).then(() => {
      dispatch(markGuideAsCompleted(addBudgetGuideId));
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
};
