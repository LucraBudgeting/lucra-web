import { FC } from 'react';

interface FilterIconProps {}

export const FilterIcon: FC<FilterIconProps> = ({}) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2, 4)">
        <path
          d="M0 0H9.6"
          stroke="#707070"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.71406 3.2H7.88549"
          stroke="#707070"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.77168 6.39995H5.82882"
          stroke="#707070"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
