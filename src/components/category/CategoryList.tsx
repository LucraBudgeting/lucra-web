import { FC } from 'react';
import { category } from './category.type';
import container from '@/assets/theme/components/container';
import styled from 'styled-components';

interface CategoryListProps {
  income: category[];
  expense: category[];
}

export const CategoryList: FC<CategoryListProps> = ({ income, expense }) => {
  return <div>CategoryList</div>;
};

const Styled = {
    container: styled.div``,
    title: styled.h1``,
    
};
