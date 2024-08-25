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
    width: 36px;
    height: 20px;

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
      height: 16px;
      width: 16px;
      left: 3px;
      bottom: 2px;
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
      -webkit-transform: translateX(15px);
      -ms-transform: translateX(15px);
      transform: translateX(15px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 30px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  `,
};
