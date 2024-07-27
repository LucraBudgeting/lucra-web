import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { Chevron } from '@/assets/chevron';

interface BaseSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange: (updatedValue: string) => void;
  options: { value: string | number; displayName?: string }[];
  sz?: Size;
}

type Size = 'small' | 'medium' | 'large' | 'auto';

export const BaseSelect: FC<BaseSelectProps> = (props) => {
  const { onValueChange, value, options, sz = 'auto' } = props;
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value as string);
  };
  return (
    <Styles.container size={sz}>
      <Styles.select onChange={onChange} value={value ?? ''}>
        {options.map((option, i) => (
          <option value={option.value ? option.value : '0'} key={i}>
            {option.displayName ? option.displayName : option.value}
          </option>
        ))}
      </Styles.select>
      <Styles.chevronWrapper>
        <Chevron color="#9B9B9B" />
      </Styles.chevronWrapper>
    </Styles.container>
  );
};

const Styles = {
  container: styled.div<{ size: Size }>`
    position: relative;
    width: ${({ size }) =>
      size === 'small' ? '25%' : size === 'medium' ? '50%' : size === 'large' ? '100%' : 'auto'};
  `,
  select: styled.select`
    padding: 16px 20px;
    background: transparent;
    color: #333;
    font-size: 16px;
    border: 2px solid #cccccc;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
    &:focus {
      border-color: none;
      outline: none;
    }
    z-index: 2;
    appearance: none;
  `,
  chevronWrapper: styled.div`
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  `,
};
