import { FC } from 'react';

type CheckboxProps = {
  status?: 'success' | 'warning' | '';
};

export const Checkbox: FC<CheckboxProps> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'success':
        return '#00C48C';
      case 'warning':
        return '#fff154';
      default:
        return '#c5c5c5';
    }
  };

  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill={getColor()} />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  );
};
