import { FC } from 'react';

interface PaperOutlineProps {}

export const PaperOutline: FC<PaperOutlineProps> = ({}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
      <path
        d="M9.92338 0.5H2.38492C1.49276 0.5 0.769531 1.22323 0.769531 2.11538V12.8846C0.769531 13.7768 1.49276 14.5 2.38492 14.5H9.92338C10.8155 14.5 11.5388 13.7768 11.5388 12.8846V2.11538C11.5388 1.22323 10.8155 0.5 9.92338 0.5Z"
        stroke="#333333"
        strokeLinejoin="round"
      />
      <path
        d="M3.46191 3.19238H8.84653"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.46191 5.88452H8.84653"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.46191 8.5769H6.15422"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
