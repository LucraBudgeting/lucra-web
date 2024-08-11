import { FC, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiContext } from '@/stores/contexts/api.context';
import { addNewCategory } from '@/stores/slices/Dashboard.slice';
import { ICategory } from '@/types/basic/Category.type';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { Button } from '@/atoms/button/Button';
import { balanceEntry } from '@/types/types';
import { EditOrAddCategoryDialog } from '../dialog/EditOrAddCategoryDialog';

interface AddBudgetRowProps {
  initialBudgetType?: balanceEntry;
}

export const AddBudgetRow: FC<AddBudgetRowProps> = ({ initialBudgetType }) => {
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
    categoryApi
      .AddCategory(newCategory)
      .then((res) => {
        dispatch(addNewCategory(res.category));
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
        <Button onClick={openBudget} type="empty">
          + New Category
        </Button>
      )}
      {isModalOpen && (
        <EditOrAddCategoryDialog
          budgeted={0}
          closeCb={onBudgetDialogClose}
          closeOnOverlayClick={true}
          successCb={addBudgetCb}
          nextText="Add Category"
          initialBudgetType={initialBudgetType}
        />
      )}
    </div>
  );
};
