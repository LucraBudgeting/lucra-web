import { FC } from 'react';
import styled from 'styled-components';

interface BaseButtonProps {
  primaryb?: string;

  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
}

interface ButtonProps extends BaseButtonProps {
  primary?: boolean;

  label: string;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  primary = true,
  backgroundColor,
  size = 'medium',
  label,
  onClick,
}) => {
  return (
    <Styled.button
      type="button"
      size={size}
      primaryb={primary.toString()}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {label}
    </Styled.button>
  );
};

const Styled = {
  button: styled.button<BaseButtonProps>`
    background-color: ${(props) => {
      if (props.backgroundColor) {
        return props.backgroundColor;
      }

      if (props.primaryb == 'true') {
        return '#333';
      }

      return 'transparent';
    }};
    color: ${({ primaryb }) => {
      if (primaryb == 'true') {
        return '#fff';
      }

      return '#333';
    }};
    font-size: ${(props) => {
      switch (props.size) {
        case 'large':
          return '18px';
        case 'small':
          return '14px';
        default:
          return '16px';
      }
    }};
    border: none;
    border-radius: 8px;
    padding: ${(props) => {
      switch (props.size) {
        case 'large':
          return '12px 24px';
        case 'small':
          return '8px 16px';
        default:
          return '10px 20px';
      }
    }};
    cursor: pointer;
    transition: background-color 0.5s;

    &:hover {
      background-color: ${(props) => {
        if (props.primaryb == 'true') {
          return '#44444441';
        }

        return '#f3f3f3a5';
      }};

      color: ${(props) => {
        if (props.primaryb == 'true') {
          return '#fff';
        }

        return '#333';
      }};
    }
  `,
};
