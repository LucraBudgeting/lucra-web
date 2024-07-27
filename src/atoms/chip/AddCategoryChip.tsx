import { FC } from 'react';
import styled from 'styled-components';
import Styled from './Chip.styled';

interface AddCategoryChipProps {
  onClick?: () => void;
}

export const AddCategoryChip: FC<AddCategoryChipProps> = ({ onClick }) => {
  return (
    <AddChip onClick={onClick}>
      <Styled.emoji role="img" aria-label="emoji">
        +
      </Styled.emoji>
      <Styled.label>Add Category</Styled.label>
    </AddChip>
  );
};

const AddChip = styled(Styled.chip)`
  padding: 8px 10px 8px 10px;
  gap: 4px;
  border-radius: 8px;
  border: 1px;
  opacity: 0px;
  box-shadow: 0px 2px 6px 0px #0000000f;
`;
