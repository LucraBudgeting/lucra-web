import styled, { keyframes } from 'styled-components';
import { DarkLogoAnimated } from '@/assets/logos/Dark_Logo.animated';

export function LoadingComponent({
  loadingText,
  animateOnly = false,
  maxHeight = '100px',
}: {
  loadingText?: string;
  animateOnly?: boolean;
  maxHeight?: string;
}) {
  const animation = <DarkLogoAnimated width={maxHeight} height={maxHeight} />;
  if (animateOnly) {
    return animation;
  }

  return (
    <Styled.container id="loading">
      <Styled.animationContainer $maxHeight={maxHeight} id="loading-container">
        {animation}
      </Styled.animationContainer>
      {loadingText && <Styled.text>{loadingText}</Styled.text>}
    </Styled.container>
  );
}

const breathing = keyframes`
  0%, 100% { font-size: 1em; }
  50% { font-size: 1.015em; }
`;

const Styled = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  `,
  animationContainer: styled.div<{ $maxHeight?: string }>`
    padding: 0.25rem;
    max-height: ${({ $maxHeight: maxheight }) => (maxheight ? maxheight : '10vh')};
  `,
  text: styled.h6`
    animation: ${breathing} 3s infinite ease-in-out;
  `,
};
