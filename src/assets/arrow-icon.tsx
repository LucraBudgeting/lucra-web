import { FC } from 'react';

interface ArrowIconProps {
  onClick?: () => void;
}

export const ArrowIcon: FC<ArrowIconProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8H1M1 8L8 15M1 8L8 1"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
