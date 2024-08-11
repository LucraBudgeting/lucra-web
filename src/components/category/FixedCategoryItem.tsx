import { FC } from 'react';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';
import { ICategory } from '@/types/basic/Category.type';

interface FixedCategoryItemProps extends ICategory {
  categoryClickCb: (event: React.MouseEvent) => void;
}

export const FixedCategoryItem: FC<FixedCategoryItemProps> = ({
  label,
  avatar,
  categoryClickCb,
}) => {
  const { emoji, backgroundColor } = avatar;
  return (
    <Styled.container onClick={(e) => categoryClickCb(e)}>
      <Styled.emoji color={backgroundColor}>{emoji}</Styled.emoji>
      <Styled.title>{label}</Styled.title>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    /* border: 1px solid ${colors.grey[300]}; */
    display: flex;
    width: 100%;
    align-items: center;
    gap: 14px;
    cursor: pointer;
  `,
  title: styled.h1`
    color: var(--Grey-Dark, #333);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  `,
  emoji: styled.h1<{ color?: string }>`
    background: ${({ color }) => color ?? 'transparent'};
    border-radius: 20px;
    padding: 4px;
  `,
};
