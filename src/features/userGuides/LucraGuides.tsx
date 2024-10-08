import { FC } from 'react';
import { AddAccountGuide } from '@/features/userGuides/AddAccountGuide';
import { useUserGuide } from '@/hooks/guide/useUserGuide.hook';
import { AddBudgetGuide } from './AddBudgetGuide';

interface LucraGuidesProps {}

export const LucraGuides: FC<LucraGuidesProps> = ({}) => {
  const { isFetching } = useUserGuide();

  if (isFetching) {
    return null;
  }

  return (
    <>
      <AddAccountGuide />
      <AddBudgetGuide />
    </>
  );
};
