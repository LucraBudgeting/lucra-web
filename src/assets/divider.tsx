import { FC } from 'react';
import styled from 'styled-components';

interface dividerProps {
  width?: string;
  height?: string;
}

const Svg = styled.svg``;
export const DividerSvg: FC<dividerProps> = ({ width = '402', height = '2' }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 402 2"
      fill="none"
    >
      <path d="M1 1H401" stroke="#E8E8E8" stroke-width="2" stroke-linecap="round" />
    </Svg>
  );
};
