import { FC } from 'react';
import styled from 'styled-components';
import { siteImageUrls } from '@/assets/site-image-urls';
import { styles } from './Styles';

interface OnboardingStep6Props {}

export const OnboardingStep6Left: FC<OnboardingStep6Props> = ({}) => {
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

export const OnboardingStep6Right: FC<OnboardingStep6Props> = ({}) => {
  return (
    <Styled.right>
      <Styled.rightImage src={siteImageUrls.onboarding_boy} />
    </Styled.right>
  );
};

const Styled = {
  ...styles,
};
