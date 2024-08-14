import { FC } from 'react';

interface chevronProps {
  direction?: 'up' | 'down' | 'right' | 'left';
  color?: string;
}

export const Chevron: FC<chevronProps> = ({ direction = 'up', color }) => {
  let rotate;
  switch (direction) {
    case 'down':
      rotate = 180;
      break;
    case 'left':
      rotate = 90;
      break;
    case 'right':
      rotate = -90;
      break;
    default:
      rotate = 0;
  }
  const strokeColor = color ? color : '#E2E2E2';

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M2.3999 4.20005L5.9999 7.80005L9.5999 4.20005"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
