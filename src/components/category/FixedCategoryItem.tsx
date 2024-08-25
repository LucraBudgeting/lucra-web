import { FC } from 'react';
import styled from 'styled-components';
import { ICategory } from '@/types/basic/Category.type';
import colors from '@/assets/theme/colors';

interface FixedCategoryItemProps extends ICategory {
  categoryClickCb: (event: React.MouseEvent) => void;
  color?: string;
}

export const FixedCategoryItem: FC<FixedCategoryItemProps> = ({
  label,
  avatar,
  categoryClickCb,
  color,
}) => {
  const { emoji } = avatar;
  console.log(color);
  return (
    <Styled.container $color={color} onClick={(e) => categoryClickCb(e)}>
      <Styled.emoji>{emoji}</Styled.emoji>
      <Styled.title>{label}</Styled.title>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div<{ $color?: string }>`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
    cursor: pointer;
    color: ${(props) => props.$color || colors.grey[300]};
  `,
  title: styled.h1`
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    color: inherit;
  `,
  emoji: styled.h1`
    font-size: 12px;
    line-height: 18px;
    color: inherit;
  `,
};
