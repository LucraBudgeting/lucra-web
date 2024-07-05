import { FC } from 'react';
import styled from 'styled-components';
import { SpyGlassOutline } from '@/assets/spyglass-outline';

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 4px 8px;
  width: 250px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 8px;
`;

interface inputProps {
  placeholder?: string;
  value?: string;
  onChange: (str: string) => void;
  onXClick?: () => void;
  showX?: boolean;
}

export const SearchInput: FC<inputProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onXClick,
  showX = false,
}) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Container>
      <IconWrapper>
        <SpyGlassOutline />
      </IconWrapper>
      <StyledInput placeholder={placeholder} value={value} onChange={onInputChange} />
      {showX && (
        <IconWrapper onClick={onXClick} style={{ cursor: 'pointer' }}>
          X
        </IconWrapper>
      )}
    </Container>
  );
};
