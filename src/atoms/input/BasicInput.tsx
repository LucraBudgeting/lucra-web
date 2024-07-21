import { ChangeEvent, FC } from 'react';

interface BasicInputProps {
  value: string | null;
  onValueChange: (updatedValue: string) => void;
  placeHolder?: string;
}

export const BasicInput: FC<BasicInputProps> = ({ value, onValueChange, placeHolder }) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };
  return <input value={value ?? ''} onChange={onChange} placeholder={placeHolder} />;
};
