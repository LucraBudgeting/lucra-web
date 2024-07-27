import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { Eye } from '@/assets/eye';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  errors?: string[];
  issecret?: string;
}

export const BaseInput: FC<BaseInputProps> = (props) => {
  const { value, label, error, issecret: isSecret, errors } = props;

  if (!props.label) {
    return (
      <InputContainer>
        <StyledInput {...props} />
      </InputContainer>
    );
  }

  const [isActive, setIsActive] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
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

  const toggleSecretVisibility = () => {
    setShowSecret(!showSecret);
  };

  const inputType = isSecret ? (showSecret ? 'text' : 'password') : 'text';

  return (
    <Container>
      <InputContainer ref={parent}>
        <StyledInput
          {...props}
          type={inputType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
        <Label isactive={(isActive || value !== '').toString()} onClick={handleLabelClick}>
          {label}
        </Label>
        {isSecret && (
          <VisibilityToggle onClick={toggleSecretVisibility}>
            <Eye showCross={showSecret} />
          </VisibilityToggle>
        )}
      </InputContainer>
      <ErrorContainer>
        {error?.split('\n').map((error, i) => <Error key={i}>{error}</Error>)}
        {errors?.map((error, i) => <Error key={i}>{error}</Error>)}
      </ErrorContainer>
    </Container>
  );
};

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Container = styled.div`
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

const Label = styled.label<{ isactive: string }>`
  position: absolute;
  z-index: 1;
  left: 12px;
  top: ${(props) => (props.isactive == 'true' ? '-10px' : '18px')};
  cursor: ${(props) => (props.isactive == 'true' ? 'auto' : 'text')};
  background: white;
  padding: 0 5px;
  transition:
    top 0.2s,
    font-size 0.2s;
  font-size: ${(props) => (props.isactive == 'true' ? '14px' : '16px')};
  color: #999;
`;

export const Error = styled.div`
  color: #fe5151;
  font-family: monospace;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.5rem 0;
`;

const VisibilityToggle = styled.button`
  position: absolute;
  right: 10px;
  top: 30%;
  border: none;
  background: none;
  cursor: pointer;
  color: #333;
  font-size: 16px;
`;
