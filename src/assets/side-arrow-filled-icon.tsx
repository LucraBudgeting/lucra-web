import { FC } from 'react';

interface SideArrowFilledIconProps {
  direction?: 'right' | 'left' | 'up' | 'down';
  onClick?: () => void;
}

export const SideArrowFilledIcon: FC<SideArrowFilledIconProps> = ({ onClick, direction }) => {
  let rotate = 0;

  switch (direction) {
    case 'right':
      rotate = 180;
      break;
    case 'left':
      rotate = 0;
      break;
    case 'up':
      rotate = 90;
      break;
    case 'down':
      rotate = 270;
      break;
  }
  return (
    <svg
      onClick={onClick}
      width="9"
      height="13"
      viewBox="0 0 7 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)`, transition: 'transform 0.3s ease' }}
    >
      <path
        d="M0.328411 5.744C-0.114011 5.34666 -0.114011 4.65334 0.328411 4.256L4.58182 0.436019C5.22558 -0.142142 6.25 0.314742 6.25 1.18002L6.25 8.81999C6.25 9.68526 5.22558 10.1421 4.58182 9.56398L0.328411 5.744Z"
        fill="#9B9B9B"
      />
    </svg>
  );
};
