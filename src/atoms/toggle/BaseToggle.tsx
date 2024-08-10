import { FC } from 'react';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';

interface BaseToggleProps {
  onValueChange: (updatedValue: boolean) => void;
  value: boolean;
}

export const BaseToggle: FC<BaseToggleProps> = ({ onValueChange, value }) => {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    onValueChange(event.target.checked);
  }
  return (
    <Styled.label>
      <input type="checkbox" checked={value} onChange={onChange} />
      <span className="slider round"></span>
    </Styled.label>
  );
};

const Styled = {
  label: styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    span {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: ${colors.black.light};
    }

    input:focus + .slider {
      box-shadow: 0 0 1px ${colors.black.light};
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  `,
};
