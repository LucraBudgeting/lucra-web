import { FC } from 'react';
import styled from 'styled-components';
import { ICategory } from '../../types/basic/Category.type';

export const CategoryItem: FC<ICategory> = ({ label, emoji, backgroundColor }) => {
  return (
    <Styled.container>
      <Styled.emoji color={backgroundColor}>{emoji}</Styled.emoji>
      <Styled.title>{label}</Styled.title>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 14px;

    :hover {
      cursor: pointer;
    }
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
