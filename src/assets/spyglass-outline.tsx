import { FC } from 'react';

interface SpyGlassOutlineProps {
  type?: 'bold' | 'thin';
}

export const SpyGlassOutline: FC<SpyGlassOutlineProps> = ({ type }) => {
  const strokeColor = type === 'bold' ? '#707070' : '#9B9B9B';
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.98218 1.3999C5.07599 1.3999 4.19015 1.66862 3.43668 2.17207C2.68321 2.67553 2.09595 3.39111 1.74916 4.22832C1.40238 5.06553 1.31164 5.98678 1.48843 6.87556C1.66522 7.76434 2.10159 8.58073 2.74237 9.22151C3.38314 9.86229 4.19954 10.2987 5.08832 10.4754C5.9771 10.6522 6.89835 10.5615 7.73556 10.2147C8.57277 9.86793 9.28835 9.28067 9.7918 8.5272C10.2953 7.77373 10.564 6.88789 10.564 5.98169C10.5639 4.76655 10.0811 3.6012 9.22191 2.74196C8.36268 1.88273 7.19733 1.39998 5.98218 1.3999Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M9.40039 9.40015L12.6003 12.6"
        stroke={strokeColor}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
