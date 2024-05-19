import { FC } from 'react';
import styled from 'styled-components';
import { siteImageUrls } from '@/assets/site-image-urls';

interface OnboardingStep5Props {}

export const OnboardingStep5Left: FC<OnboardingStep5Props> = ({}) => {
  return <div>OnboardingStep5Left</div>;
};

export const OnboardingStep5Right: FC<OnboardingStep5Props> = ({}) => {
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
