import { FC } from 'react';
import Styled from './Chip.styled';

interface AddCategoryChipProps {
  onClick?: () => void;
}

export const AddCategoryChip: FC<AddCategoryChipProps> = ({ onClick }) => {
  return (
    <Styled.chip backgroundcolor={'#FFFFFF'} onClick={onClick}>
      <Styled.emoji role="img" aria-label="emoji">
        +
      </Styled.emoji>
      <Styled.label>Add Category</Styled.label>
    </Styled.chip>
  );
};
