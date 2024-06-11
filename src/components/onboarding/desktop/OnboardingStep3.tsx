import { FC, useEffect } from 'react';
import { siteImageUrls } from '@/assets/site-image-urls';
import { styles } from './Styles';

interface OnboardingStep3Props {}

export const OnboardingStep3Left: FC<OnboardingStep3Props> = ({}) => {
  useEffect(() => {
    document.title = 'Billing information';
  }, []);

  return (
    <Styled.left>
      <Styled.leftTextContainer>
        <h1>Billing information</h1>
        <h3>
          Set up your account to get started. This helps us keep your financial information safe and
          secure.
        </h3>
      </Styled.leftTextContainer>
    </Styled.left>
  );
};

export const OnboardingStep3Right: FC<OnboardingStep3Props> = ({}) => {
  return (
    <Styled.right>
      <Styled.rightImage src={siteImageUrls.onboarding_card} />
    </Styled.right>
  );
};

const Styled = {
  ...styles,
};
