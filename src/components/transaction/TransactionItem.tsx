import { FC, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { dashboardSelector, updateTransactionCategory } from '@/stores/slices/Dashboard.slice';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { ApiContext } from '@/stores/contexts/api.context';
import { Chip } from '../../atoms/chip/Chip';
import { AddCategoryChip } from '../../atoms/chip/AddCategoryChip';
import { CategoryListModal } from '../category/CategoryListModal';

interface TransactionItemProps {
  amount: number;
  description: string;
  id: string;
  isLast?: boolean;
  categoryId?: string | null;
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
    font-size: 14px;
    width: 40%;
  `,
  amount: styled.p<{ amount: number }>`
    font-weight: 600;
    color: ${(props) => (props.amount > 0 ? 'green' : 'red')};
    font-size: 16px;
  `,
  descriptionContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    width: 80%;
  `,
  amountContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  hr: styled.hr``,
};

export const TransactionItem: FC<TransactionItemProps> = ({
  amount,
  description,
  id,
  isLast = false,
  categoryId,
}) => {
  const dispatch = useDispatch();

  const { transactionApi } = useContext(ApiContext);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const { categoryDictionary } = dashboardSelector();
  const category = categoryId ? categoryDictionary[categoryId] : null;

  const toggleChipClick = () => {
    setIsAddCategoryOpen(!isAddCategoryOpen);
  };

  const associateCategory = (categoryId?: string) => {
    setIsAddCategoryOpen(false);
    transactionApi.AssociateCategory(id, categoryId).then(() => {
      dispatch(updateTransactionCategory({ id, categoryId }));
    });
  };

  return (
    <Styled.container islast={isLast ? 'true' : 'false'}>
      <Styled.descriptionContainer ref={parentRef}>
        <Styled.title>{description}</Styled.title>
        <span onClick={toggleChipClick}>
          {category ? (
            <Chip
              emoji={category.avatar.emoji}
              label={category.label}
              backgroundColor={category.avatar.backgroundColor}
            />
          ) : (
            <AddCategoryChip />
          )}
        </span>
        {isAddCategoryOpen && (
          <CategoryListModal
            parentRef={parentRef}
            categoryClickCb={associateCategory}
            outsideClickCb={toggleChipClick}
          />
        )}
      </Styled.descriptionContainer>
      <Styled.amountContainer>
        <Styled.amount amount={amount}>{formatAsMoney(amount, true)}</Styled.amount>
      </Styled.amountContainer>
    </Styled.container>
  );
};
