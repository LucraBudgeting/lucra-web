import { FC } from 'react';
import styled from 'styled-components';
import { siteImageUrls } from '@/assets/site-image-urls';

interface OnboardingStep2Props {}

export const OnboardingStep2Left: FC<OnboardingStep2Props> = ({}) => {
  return <div>OnboardingStep2Left</div>;
};

export const OnboardingStep2Right: FC<OnboardingStep2Props> = ({}) => {
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
