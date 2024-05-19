import { FC } from 'react';
import styled from 'styled-components';
import { siteImageUrls } from '@/assets/site-image-urls';

interface OnboardingStep3Props {}

export const OnboardingStep3Left: FC<OnboardingStep3Props> = ({}) => {
  return <div>OnboardingStep3Left</div>;
};

export const OnboardingStep3Right: FC<OnboardingStep3Props> = ({}) => {
  return (
    <Styled.right>
      <Styled.rightImage src={siteImageUrls.onboarding_boy} />
    </Styled.right>
  );
};

const Styled = {
  right: styled.div`
    width: 100%;
    height: 100%;
    padding: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  rightImage: styled.img`
    max-height: 100%;
    max-width: 100%;
  `,
};
