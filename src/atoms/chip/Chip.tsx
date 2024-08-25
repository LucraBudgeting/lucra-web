import { FC } from 'react';
import { Chevron } from '@/assets/chevron';
import Styled from './Chip.styled';

interface chipProps {
  emoji?: string;
  label: string;
  onClick?: () => void;
}

export const Chip: FC<chipProps> = ({ emoji, label, onClick }) => {
  return (
    <Styled.chip onClick={onClick}>
      <Styled.emoji role="img" aria-label="emoji">
        {emoji}
      </Styled.emoji>
      <Styled.label>{label}</Styled.label>
      <Chevron direction="up" color="#525252" />
    </Styled.chip>
  );
};
