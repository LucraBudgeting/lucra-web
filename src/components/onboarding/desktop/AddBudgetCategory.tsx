import { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { EditOrAddCategory } from '@/components/dialog/EditOrAddCategory';
import { category } from '@/components/category/category.type';
import { ApiContext } from '@/apis/api.context';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { styles } from './Styles';

interface AddBudgetCategoryProps {
  type: 'Income' | 'Expense';
  isDone?: boolean;
  isActive?: boolean;
}

export const AddBudgetCategory: FC<AddBudgetCategoryProps> = ({ type, isDone, isActive }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryAdding, setIsCategoryAdding] = useState(false);

  const { categoryApi } = useContext(ApiContext);

  const details = getDetailsForType(type);

  const onBudgetDialogClose = () => {
    setIsModalOpen(false);
  };

  const openBudget = () => {
    setIsModalOpen(true);
  };

  const addBudgetCb = (newCategory: category) => {
    setIsCategoryAdding(true);
    categoryApi
      .AddCategory(newCategory)
      .then((res) => {
        console.log('category added', res);
      })
      .finally(() => {
        setIsCategoryAdding(false);
      });
    setIsModalOpen(false);
  };

  return (
    <>
      <Styled.container>
        <Styled.number isDone={isDone ? 'true' : ''} isActive={isActive ? 'true' : ''}>
          1
        </Styled.number>
        <div>
          <h2>{type} Categories</h2>
          <p>{details}</p>
        </div>
        {isCategoryAdding ? (
          <LoadingComponent loadingText="Adding Category" />
        ) : (
          <button onClick={openBudget}>Add Category</button>
        )}
      </Styled.container>

      {isModalOpen && (
        <EditOrAddCategory
          budgeted={0}
          closeCb={onBudgetDialogClose}
          closeOnOverlayClick={true}
          successCb={addBudgetCb}
          nextText="Add Category"
        />
      )}
    </>
  );
};

function getDetailsForType(type: 'Income' | 'Expense'): string {
  switch (type) {
    case 'Income':
      return 'Add custom income categories and how much you expect to receive each month.';
    case 'Expense':
      return 'Add custom expense categories and how much you expect to spend each month.';
  }
}

type boolString = '' | 'true' | 'false';

const Styled = {
  ...styles,
  container: styled.div`
    display: flex;
    padding: 16px;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    border-radius: 10px;
    background: var(--Grey-Extra-Light, #f4f4f4);
  `,
  number: styled.div<{ isDone?: boolString; isActive?: boolString }>`
    font-size: 16px;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${({ isDone, isActive }) =>
      isDone === 'true' ? '#2AA64C' : isActive === 'true' ? '#136DF4' : '#E2E2E2'};
  `,
};
