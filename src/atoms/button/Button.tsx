import { FC } from 'react';
import styled from 'styled-components';

interface BaseButtonProps {
  type?: 'primary' | 'secondary' | 'error' | 'empty';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  tabIndex?: number;
}

interface ButtonProps extends BaseButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export const Button: FC<ButtonProps> = ({
  type = 'primary',
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
      type={type}
      size={size}
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

      switch (props.type) {
        case 'primary':
          return '#333';
        case 'secondary':
        case 'error':
        default:
          return 'transparent';
      }
    }};
    color: ${({ type }) => {
      switch (type) {
        case 'primary':
          return '#fff';
        case 'secondary':
          return '#333';
        case 'error':
          return '#CA4141';
        default:
          return '#333';
      }
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
    border: ${(props) => {
      switch (props.type) {
        case 'empty':
          return 'none';
        default:
          return 'solid 1px #e2e2e2';
      }
    }};
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
    box-shadow: ${(props) => {
      switch (props.type) {
        case 'empty':
          return 'none';
        default:
          return '0px 2px 6px 0px #0000000f';
      }
    }};
    cursor: pointer;
    transition: background-color 0.5s;

    &:disabled {
      background-color: ${(props) => {
        switch (props.type) {
          case 'primary':
            return '#f3f3f3';
          case 'secondary':
            return 'transparent';
          case 'error':
            return '#f3f3f3';
          default:
            return '#f3f3f3';
        }
      }};
      color: #9b9b9b;
      cursor: not-allowed;
    }

    &:hover {
      background-color: ${(props) => {
        switch (props.type) {
          case 'primary':
            return '#6e6e6e';
          case 'secondary':
            return '#f3f3f3';
          case 'error':
            return '#ff3b3b66';
          case 'empty':
            return '#EFEFEF';
          default:
            return 'transparent';
        }
      }};

      color: ${(props) => {
        switch (props.type) {
          case 'primary':
            return '#cecece';
          case 'secondary':
            return '#333';
          case 'error':
            return '#ffffffba141';
          default:
            return '#333';
        }
      }};
    }
  `,
};
