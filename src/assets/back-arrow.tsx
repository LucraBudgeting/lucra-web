import { FC } from 'react';

interface arrowProps {}

export const BackArrow: FC<arrowProps> = ({}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M4.3998 8.5999L0.799805 4.9999L4.3998 1.3999"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.2998 5H8.5998"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
