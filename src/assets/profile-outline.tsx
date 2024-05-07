import { FC } from 'react';

interface ProfileOutlineProps {}

export const ProfileOutline: FC<ProfileOutlineProps> = ({}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M10.4228 3.73077C10.2909 5.51005 8.94203 6.96154 7.46127 6.96154C5.9805 6.96154 4.62929 5.51038 4.49973 3.73077C4.36511 1.87981 5.67761 0.5 7.46127 0.5C9.24492 0.5 10.5574 1.91346 10.4228 3.73077Z"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.46162 9.11548C4.53374 9.11548 1.5621 10.7309 1.0122 13.7799C0.945899 14.1474 1.15388 14.5001 1.53854 14.5001H13.3847C13.7697 14.5001 13.9777 14.1474 13.9114 13.7799C13.3611 10.7309 10.3895 9.11548 7.46162 9.11548Z"
        stroke="#333333"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
