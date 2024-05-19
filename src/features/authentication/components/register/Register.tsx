import { FC } from 'react';
import { OnboardingContainerDesktop } from '@/components/onboarding/desktop/OnboardingContainerDesktop';

interface RegisterProps {}

export const Register: FC<RegisterProps> = ({}) => {
  return (
    <div style={{ width: '90vw', height: '90vh' }}>
      <OnboardingContainerDesktop />
    </div>
  );
};
