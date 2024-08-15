import { FC, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { dashboardSelector, updateTransactionCategory } from '@/stores/slices/Dashboard.slice';
import { formatAsMoney } from '@/utils/formatAsMoney';
import { ApiContext } from '@/stores/contexts/api.context';
import colors from '@/assets/theme/colors';
import { Chip } from '../../atoms/chip/Chip';
import { AddCategoryChip } from '../../atoms/chip/AddCategoryChip';
import { CategoryListModal } from '../category/CategoryListModal';
import { TransactionDetails } from './TransactionDetails';

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
    align-items: center;
    padding: 16px 24px;
    height: 40px;
    border-bottom: ${(props) =>
      props.islast === 'true' ? 'none' : `1px solid ${colors.grey[300]}`};
    cursor: pointer;
  `,
  title: styled.h3`
    margin-bottom: 8px;
    font-weight: 400;
    color: black;
    font-size: 14px;
    width: 40%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  `,
  amount: styled.p<{ amount: number }>`
    font-weight: 600;
    color: ${(props) => (props.amount > 0 ? colors.success.main : colors.black.main)};
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

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { transactionApi } = useContext(ApiContext);
  const parentRef = useRef<HTMLDivElement>(null);
  const { categoryDictionary } = dashboardSelector();
  const category = categoryId ? categoryDictionary[categoryId] : null;

  const toggleChipClick = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setIsAddCategoryOpen(!isAddCategoryOpen);
  };

  const associateCategory = (categoryId?: string) => {
    setIsAddCategoryOpen(false);
    transactionApi.AssociateCategory(id, categoryId).then(() => {
      dispatch(updateTransactionCategory({ id, categoryId }));
    });
  };

  const toggleDetails = () => {
    if (isAddCategoryOpen) {
      return;
    }
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <>
      <Styled.container islast={isLast ? 'true' : 'false'} onClick={toggleDetails}>
        <Styled.descriptionContainer ref={parentRef}>
          <Styled.title>{description}</Styled.title>
          <span onClick={(e) => toggleChipClick(e)}>
            {category ? (
              <Chip emoji={category.avatar.emoji} label={category.label} />
            ) : (
              <AddCategoryChip />
            )}
          </span>
          {isAddCategoryOpen && (
            <CategoryListModal
              parentRef={parentRef}
              categoryClickCb={associateCategory}
              outsideClickCb={toggleChipClick}
              currentCategoryId={id}
            />
          )}
        </Styled.descriptionContainer>
        <Styled.amountContainer>
          <Styled.amount amount={amount}>{formatAsMoney(amount, true)}</Styled.amount>
        </Styled.amountContainer>
      </Styled.container>
      {isDetailsOpen && <TransactionDetails closeCb={toggleDetails} id={id} />}
    </>
  );
};
