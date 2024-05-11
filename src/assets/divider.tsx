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
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path d={`M1 1H${width}`} stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};
