import { FC } from 'react';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';
import { Chevron } from '@/assets/chevron';
import Styled from './Chip.styled';

interface AddCategoryChipProps {
  onClick?: () => void;
}

export const AddCategoryChip: FC<AddCategoryChipProps> = ({ onClick }) => {
  return (
    <AddChip onClick={onClick}>
      <Styled.addLabel>Select Category</Styled.addLabel>
      <Chevron />
    </AddChip>
  );
};

const AddChip = styled(Styled.chip)`
  padding: 8px 10px 8px 10px;
  gap: 4px;
  border-radius: 8px;
  border: 1px solid ${colors.grey[100]};
  background-color: ${colors.white.main};
  box-shadow: 0px 2px 6px 0px #0000000f;

  &:hover {
    background-color: ${colors.grey[200]};
    border: 1px solid ${colors.grey[300]};
  }
`;
