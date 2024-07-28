import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { ISelectOptions } from './BaseSelect';

interface BasicSelectProps {
  value: string | null;
  onValueChange: (updatedValue: string) => void;
  options: ISelectOptions[];
}

export const BasicSelect: FC<BasicSelectProps> = ({ value, onValueChange, options }) => {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value as string);
  };
  return (
    <Styles.container>
      <Styles.select onChange={onChange} value={value ?? ''}>
        {options.map((option, i) => (
          <option value={option.value ? option.value : '0'} key={i}>
            {option.displayName ? option.displayName : option.value}
          </option>
        ))}
      </Styles.select>
    </Styles.container>
  );
};

const Styles = {
  container: styled.div``,
  select: styled.select`
    background: #6f6f6f83;
  `,
};
