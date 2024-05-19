import { FC } from 'react';
import styled from 'styled-components';

interface OnboardingDualCardContainerProps {
  leftCard: JSX.Element;
  rightCard: JSX.Element;
}

export const OnboardingDualCardContainer: FC<OnboardingDualCardContainerProps> = ({
  leftCard,
  rightCard,
}) => {
  return (
    <Styled.container>
      <Styled.cardContainer>{leftCard}</Styled.cardContainer>
      <Styled.cardContainer>{rightCard}</Styled.cardContainer>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    width: 100%;
    height: 100%;
  `,
  cardContainer: styled.div`
    border-radius: 20px;
    border: 1px solid  #e2e2e2;
    background: #f4f4f4;
    box-shadow: 0px 4px 12px -1px rgba(0, 0, 0, 0.1);
  `,
};
