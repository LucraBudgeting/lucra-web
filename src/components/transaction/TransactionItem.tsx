import { FC } from 'react';
import styled from 'styled-components';
import { Chip } from '../../atoms/chip/Chip';
import { AddCategoryChip } from '../../atoms/chip/AddCategoryChip';
import { ICategory } from '../../types/basic/Category.type';

interface TransactionItemProps {
  category?: ICategory;
  amount: number;
  description: string;
  id: string;
  isLast?: boolean;
}

const Styled = {
  container: styled.div<{ islast: string }>`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    height: 40px;
    border-bottom: ${(props) => (props.islast === 'true' ? 'none' : '1px solid #d3d3d399')};
  `,
  title: styled.h3`
    margin-bottom: 8px;
    font-weight: 400;
    color: black;
  `,
  amount: styled.p`
    font-weight: 600;
    color: black;
    font-size: 16px;
  `,
  descriptionContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  `,
  amountContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  hr: styled.hr``,
};

export const TransactionItem: FC<TransactionItemProps> = ({
  category,
  amount,
  description,
  isLast = false,
}) => {
  return (
    <Styled.container islast={isLast ? 'true' : 'false'}>
      <Styled.descriptionContainer>
        <Styled.title>{description}</Styled.title>
        {category ? <Chip {...category} /> : <AddCategoryChip />}
      </Styled.descriptionContainer>
      <Styled.amountContainer>
        <Styled.amount>{amount}</Styled.amount>
      </Styled.amountContainer>
    </Styled.container>
  );
};
