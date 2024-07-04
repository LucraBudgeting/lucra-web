import { FC } from 'react';

interface PlusIconProps {}

export const PlusIcon: FC<PlusIconProps> = ({}) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 2.3999V13.5999"
        stroke="#707070"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5999 8H2.3999"
        stroke="#707070"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
