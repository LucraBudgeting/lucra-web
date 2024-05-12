import { FC } from 'react';

interface SelectedColorCircleProps {
  color: string;
}

export const SelectedColorCircle: FC<SelectedColorCircleProps> = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="20" rx="20" ry="20" fill={`#${color}`} />
    </svg>
  );
};
