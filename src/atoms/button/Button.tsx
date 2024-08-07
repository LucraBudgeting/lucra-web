import { FC } from 'react';
import styled from 'styled-components';

interface BaseButtonProps {
  primaryb?: string;

  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  tabIndex?: number;
}

interface ButtonProps extends BaseButtonProps {
  primary?: boolean;

  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export const Button: FC<ButtonProps> = ({
  primary = true,
  backgroundColor,
  size = 'medium',
  label,
  onClick,
  disabled = false,
  children,
  className,
  tabIndex,
  id,
}) => {
  return (
    <Styled.button
      id={id}
      tabIndex={tabIndex}
      type="button"
      size={size}
      primaryb={primary.toString()}
      backgroundColor={backgroundColor}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children ? children : label}
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

    &:disabled {
      background-color: ${(props) => {
        if (props.primaryb == 'true') {
          return '#f3f3f3';
        }

        return 'transparent';
      }};
      color: #9b9b9b;
      cursor: not-allowed;
    }

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
