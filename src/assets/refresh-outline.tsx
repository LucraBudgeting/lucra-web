import { FC } from 'react';

interface RefreshOutlineProps {}

export const RefreshOutline: FC<RefreshOutlineProps> = ({}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
      <path
        d="M2.5 7.5C2.5 4.73858 4.73858 2.5 7.5 2.5C9.05249 2.5 10.4307 3.24411 11.3033 4.3934M13.5 2.5V5.5H10.5"
        stroke="#333333"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M13.5 7.5C13.5 10.2614 11.2614 12.5 8.5 12.5C6.94751 12.5 5.56927 11.7559 4.6967 10.6066M2.5 12.5V9.5H5.5"
        stroke="#333333"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
