import { FC } from 'react';
import styled from 'styled-components';

interface SelectedColorCircleProps {
  color: string;
}

export const SelectedColorCircle: FC<SelectedColorCircleProps> = ({ color }) => {
  return (
    <Styled.container>
      <Styled.backgroundSvg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <ellipse cx="20" cy="20" rx="20" ry="20" fill={`#${color}`} />
      </Styled.backgroundSvg>
      <Styled.centeredSvg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
      >
        <path
          d="M14.3002 1.6001L5.48019 11.6801L1.7002 7.9001"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Styled.centeredSvg>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: grid;
    place-items: center;
  `,
  backgroundSvg: styled.svg`
    z-index: 1;
    grid-area: 1 / 1;
  `,
  centeredSvg: styled.svg`
    z-index: 2;
    grid-area: 1 / 1;
  `,
};
