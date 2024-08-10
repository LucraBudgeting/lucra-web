import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

interface DarkLogoProps {
  width?: string;
  height?: string;
}

const growShrink1 = keyframes`
  0%, 100% { transform: scaleY(1); opacity: 0.65; }
  50% { transform: scaleY(1.1); opacity: 1; }
`;

const growShrink2 = keyframes`
  0%, 100% { transform: scaleY(1); opacity: 0.45; }
  50% { transform: scaleY(0.88); opacity: 1; }
`;

const AnimatedPath1 = styled.path`
  animation: ${growShrink1} 1.5s infinite ease-in-out;
  transform-origin: bottom;
`;

const AnimatedPath2 = styled.path`
  animation: ${growShrink2} 1.75s infinite ease-in-out;
  transform-origin: top;
`;

export const DarkLogoAnimated: FC<DarkLogoProps> = ({ width = '100%', height = '100%' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 -5 25 30"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <AnimatedPath1
        d="M1.71596 0C0.76826 0 0 0.773755 0 1.72823V22.706C0 24.1158 1.5289 24.8588 2.54084 23.8847C6.23486 20.329 12.7199 12.6042 13.3545 1.72956C13.4102 0.77673 12.6366 0 11.6889 0H1.71596Z"
        fill="#333333"
      />
      <AnimatedPath2
        d="M24.6067 28.2718C24.6067 29.2262 23.8385 30 22.8908 30H3.35195C1.95289 30 1.21614 28.4639 2.18672 27.449C5.57757 23.9035 12.7823 17.8474 22.889 17.2176C23.8349 17.1586 24.6067 17.9379 24.6067 18.8924V28.2718Z"
        fill="#333333"
      />
    </svg>
  );
};
