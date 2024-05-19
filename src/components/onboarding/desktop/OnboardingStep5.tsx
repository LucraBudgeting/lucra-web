import { FC } from 'react';
import { siteImageUrls } from '@/assets/site-image-urls';
import { styles } from './Styles';

interface OnboardingStep5Props {}

export const OnboardingStep5Left: FC<OnboardingStep5Props> = ({}) => {
  return (
    <Styled.left>
      <Styled.leftTextContainer>
        <h1>Create your account</h1>
        <h3>
          Set up your account to get started. This helps us keep your financial information safe and
          secure.
        </h3>
      </Styled.leftTextContainer>
    </Styled.left>
  );
};

export const OnboardingStep5Right: FC<OnboardingStep5Props> = ({}) => {
  return (
    <Styled.right>
      <Styled.rightImage src={siteImageUrls.onboarding_boy} />
    </Styled.right>
  );
};

const Styled = {
  ...styles,
};
