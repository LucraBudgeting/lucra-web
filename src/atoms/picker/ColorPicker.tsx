import { FC } from 'react';
import styled from 'styled-components';
import { SelectedColorCircle } from './SelectedColorCircle';
import { ColorCircle } from './ColorCircle';

interface ColorPickerProps {
  onClick: (color: string) => void;
  selectedColor?: string;
}

const colors = [
  '49CCCB',
  '3687F7',
  '845EF8',
  'A34FF6',
  'C63EF6',
  'EA1CC6',
  'EA3B6A',
  'ED5815',
  'ED9715',
  'EDD715',
];

export const ColorPicker: FC<ColorPickerProps> = ({ onClick, selectedColor }) => {
  const selectColor = (color: string) => {
    onClick(color);
  };

  return (
    <Styled.container>
      {colors.map((color) => (
        <Styled.colorContainer key={color} onClick={() => selectColor(color)}>
          {isColorSelected(color, selectedColor) ? (
            <ColorCircle color={color} />
          ) : (
            <SelectedColorCircle color={color} />
          )}
        </Styled.colorContainer>
      ))}
    </Styled.container>
  );
};

function isColorSelected(color: string, selectedColor?: string) {
  return color === selectedColor;
}

const Styled = {
  container: styled.div`
    width: 100%;
    display: flex;
    gap: 16px;
    overflow-x: auto;
  `,
  colorContainer: styled.div`
    cursor: pointer;
  `,
};
