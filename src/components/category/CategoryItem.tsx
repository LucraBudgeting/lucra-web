import { FC } from 'react';
import styled from 'styled-components';
import { ICategory } from '../../types/basic/Category.type';

interface categoryProps extends ICategory {
  categoryClickCb: (event: React.MouseEvent, id?: string) => void;
}

export const CategoryItem: FC<categoryProps> = ({ label, id, avatar, categoryClickCb }) => {
  const { emoji } = avatar;

  return (
    <Styled.container onClick={(e) => categoryClickCb(e, id)}>
      <Styled.emoji>{emoji}</Styled.emoji>
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
  emoji: styled.h1`
    border-radius: 20px;
    padding: 4px;
  `,
};
