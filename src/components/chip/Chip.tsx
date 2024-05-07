import { FC } from 'react';
import Styled from './Chip.styled';

interface chipProps {
  emoji?: string;
  backgroundColor?: string;
  label: string;
  onClick?: () => void;
}

export const Chip: FC<chipProps> = ({ emoji, label, onClick, backgroundColor }) => {
  return (
    <Styled.chip backgroundcolor={backgroundColor} onClick={onClick}>
      <Styled.emoji role="img" aria-label="emoji">
        {emoji}
      </Styled.emoji>
      <Styled.label>{label}</Styled.label>
    </Styled.chip>
  );
};
