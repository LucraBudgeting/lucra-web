import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { Chevron } from '@/assets/chevron';

export interface ISelectOption {
  value: string | number;
  displayName?: string;
}

export interface ISelectOptionGroup {
  label: string;
  options: ISelectOption[];
}

interface BaseSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange: (updatedValue: string) => void;
  options?: ISelectOption[];
  groups?: ISelectOptionGroup[];
  sz?: Size;
}

type Size = 'small' | 'medium' | 'large' | 'auto';

export const BaseSelect: FC<BaseSelectProps> = (props) => {
  const { onValueChange, value, options, sz = 'auto', groups } = props;
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value as string);
  };
  return (
    <Styles.container size={sz}>
      <Styles.select onChange={onChange} value={value ?? ''}>
        {options?.map((option, i) => <BaseOption baseOption={option} key={i} />)}
        {groups?.map((group, i) => {
          return group.label ? (
            <optgroup label={group.label} key={i}>
              {group.options.map((option, j) => (
                <BaseOption baseOption={option} key={j} />
              ))}
            </optgroup>
          ) : (
            <BaseOption baseOption={group.options[0]} />
          );
        })}
      </Styles.select>
      <Styles.chevronWrapper>
        <Chevron color="#9B9B9B" />
      </Styles.chevronWrapper>
    </Styles.container>
  );
};

export const BaseOption: FC<{ baseOption: ISelectOption; key?: number | string }> = ({
  baseOption,
  key,
}) => {
  return (
    <option value={baseOption.value ? baseOption.value : '0'} key={key}>
      {baseOption.displayName ? baseOption.displayName : baseOption.value}
    </option>
  );
};

const Styles = {
  container: styled.div<{ size: Size }>`
    display: flex;
    align-items: center;
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
