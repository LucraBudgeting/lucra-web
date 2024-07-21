import { FC } from 'react';

interface automationProps {}

export const AutomationIcon: FC<automationProps> = ({}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#333333"
    >
      <path d="m368-480 93-93-90-90-47 47-20-20 47-47-88-88-93 93 198 198Zm309 309 93-93-88-88-47 47-20-20 47-47-89-89-93 93 197 197Zm10-589 73 73-73-73ZM285-172H172v-113l176-176-216-217 131-131 218 217 187-187q5-5 10-7t11-2q6 0 11 2t10 7l69 72q5 5 6.5 10t1.5 11q0 6-1.5 10.5T779-666L594-480l215 217-131 131-217-216-176 176Zm-85-28h73l393-393-73-73-393 393v73Zm430-430-37-36 73 73-36-37Z" />
    </svg>
  );
};
