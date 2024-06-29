import { FC, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ApiContext } from '@/apis/api.context';
import { EditOrAddCategory } from '@/components/dialog/EditOrAddCategory';
import { addNewCategory } from '@/stores/slices/Dashboard.slice';
import { ICategory } from '@/types/basic/Category.type';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';

interface BudgetsHeaderProps {}

export const BudgetsHeader: FC<BudgetsHeaderProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryAdding, setIsCategoryAdding] = useState(false);
  const dispatch = useDispatch();

  const { categoryApi } = useContext(ApiContext);

  const onBudgetDialogClose = () => {
    setIsModalOpen(false);
  };

  const openBudget = () => {
    setIsModalOpen(true);
  };

  const addBudgetCb = (newCategory: ICategory) => {
    setIsCategoryAdding(true);
    console.log('newCategory', newCategory);
    categoryApi
      .AddCategory(newCategory)
      .then((res) => {
        dispatch(addNewCategory(res.category));
        console.log('category added', res);
      })
      .finally(() => {
        setIsCategoryAdding(false);
      });
    setIsModalOpen(false);
  };
  return (
    <div>
      {isCategoryAdding ? (
        <LoadingComponent />
      ) : (
        <Styles.addBudget onClick={openBudget}>Add Budget</Styles.addBudget>
      )}
      {isModalOpen && (
        <EditOrAddCategory
          budgeted={0}
          closeCb={onBudgetDialogClose}
          closeOnOverlayClick={true}
          successCb={addBudgetCb}
          nextText="Add Category"
        />
      )}
    </div>
  );
};

const Styles = {
  addBudget: styled.button``,
};
