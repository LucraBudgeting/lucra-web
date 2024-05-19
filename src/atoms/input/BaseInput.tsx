import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const BaseInput: FC<BaseInputProps> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [parent] = useAutoAnimate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setIsActive(false);
    }
    props.onBlur && props.onBlur(e);
  };

  const handleLabelClick = () => {
    inputRef.current?.focus();
  };

  if (!props.label) {
    return (
      <InputContainer>
        <StyledInput {...props} />
      </InputContainer>
    );
  }

  return (
    <InputContainer ref={parent}>
      <StyledInput {...props} onFocus={handleFocus} onBlur={handleBlur} ref={inputRef} />
      <Label isActive={isActive || props.value !== ''} onClick={handleLabelClick}>
        {props.label}
      </Label>
      {props.error?.split('\n').map((error, i) => <Error key={i}>{error}</Error>)}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 16px 20px;
  background: transparent;
  color: #333;
  font-size: 16px;
  border: 2px solid #cccccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border-color: none;
    outline: none;
  }
  z-index: 2;
`;

const Label = styled.label<{ isActive: boolean }>`
  position: absolute;
  z-index: 1;
  left: 12px;
  top: ${(props) => (props.isActive ? '-10px' : '18px')};
  cursor: ${(props) => (props.isActive ? 'auto' : 'text')};
  background: white;
  padding: 0 5px;
  transition:
    top 0.2s,
    font-size 0.2s;
  font-size: ${(props) => (props.isActive ? '14px' : '16px')};
  color: #999;
`;

const Error = styled.div`
  color: #fe5151;
  margin-top: 8px;
  margin-left: 4px;
  font-family: monospace;
`;
