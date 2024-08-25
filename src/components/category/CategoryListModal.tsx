import { FC, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SpyGlassOutline } from '@/assets/spyglass-outline';
import { addNewCategory, dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { useOutsideClickRef } from '@/hooks/react/useOutsideClickRef';
import { maxZIndex } from '@/utils/domConstants';
import colors from '@/assets/theme/colors';
import { ApiContext } from '@/stores/contexts/api.context';
import { ICategory } from '../../types/basic/Category.type';
import { EditOrAddCategoryDialog } from '../dialog/EditOrAddCategoryDialog';
import { CategoryItem } from './CategoryItem';
import { FixedCategoryItem } from './FixedCategoryItem';

interface CategoryListProps {
  parentRef: React.RefObject<HTMLDivElement>;
  categoryClickCb: (id?: string) => void;
  outsideClickCb?: () => void;
  currentCategoryId?: string;
}

export const CategoryListModal: FC<CategoryListProps> = ({
  parentRef,
  categoryClickCb,
  outsideClickCb,
  currentCategoryId,
}) => {
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({
    display: 'none',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { debitCategories, creditCategories, transferCategory } = dashboardSelector();
  const [incomeList, setIncomeList] = useState<ICategory[]>(creditCategories);
  const [expenseList, setExpenseList] = useState<ICategory[]>(debitCategories);
  const modalRef = useOutsideClickRef(outsideClick);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { categoryApi } = useContext(ApiContext);
  const dispatch = useDispatch();

  function outsideClick() {
    if (isAddCategoryOpen) {
      return;
    }

    setIsVisible(false);
    outsideClickCb && outsideClickCb();
  }

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const availableHeightBelow = window.innerHeight - rect.bottom;
      const availableHeightAbove = rect.top;
      const modalHeight = 400;

      let top = rect.bottom + window.scrollY;
      const left = window.scrollX + rect.width / 3;

      if (availableHeightBelow < modalHeight && availableHeightAbove > modalHeight) {
        top = rect.top + window.scrollY - modalHeight;
      }

      setModalStyle({
        position: 'absolute',
        top,
        left: left,
        maxHeight: `${modalHeight}px`,
        zIndex: maxZIndex + 1,
      });
      setIsVisible(true);
    }
  }, [parentRef]);

  useEffect(() => {
    setIncomeList(creditCategories);
    setExpenseList(debitCategories);
  }, [creditCategories, debitCategories]);

  useEffect(() => {
    //AUTO FOCUS SEARCH WHEN RENDERED
    if (isVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef, isVisible]);

  const filterCategories = (value: string) => {
    const incomeCategories = creditCategories.filter((category) =>
      category.label.toLowerCase().includes(value.toLowerCase())
    );
    const expenseCategories = debitCategories.filter((category) =>
      category.label.toLowerCase().includes(value.toLowerCase())
    );

    setIncomeList(incomeCategories);
    setExpenseList(expenseCategories);
    setSearchValue(value);
  };

  function categoryClick(event: React.MouseEvent, id?: string) {
    event.stopPropagation();
    categoryClickCb(id);
  }

  function setAsTransfer(event: React.MouseEvent) {
    event.stopPropagation();
    categoryClickCb(transferCategory.id);
  }

  function toggleAddCategory() {
    setIsAddCategoryOpen(!isAddCategoryOpen);
  }

  const addBudgetCb = (newCategory: ICategory) => {
    categoryApi
      .AddCategory(newCategory)
      .then((res) => {
        dispatch(addNewCategory(res.category));
      })
      .finally(() => {
        setIsAddCategoryOpen(false);
      });
  };

  return (
    <>
      <Styled.container ref={modalRef} style={modalStyle}>
        <Styled.searchContainer>
          <SpyGlassOutline />
          <Styled.searchInput
            ref={searchInputRef}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => filterCategories(e.target.value)}
          />
        </Styled.searchContainer>
        {!!incomeList.length && (
          <Styled.categoryConatainer>
            <Styled.title id="income-category-title">Income</Styled.title>
            {incomeList.map((income) => (
              <CategoryItem key={income.id} {...income} categoryClickCb={categoryClick} />
            ))}
          </Styled.categoryConatainer>
        )}
        {!!expenseList.length && (
          <Styled.categoryConatainer>
            <Styled.title id="expense-category-title">Expense</Styled.title>
            {expenseList.map((expense) => (
              <CategoryItem key={expense.id} {...expense} categoryClickCb={categoryClick} />
            ))}
          </Styled.categoryConatainer>
        )}
        {!!(!expenseList.length && !incomeList.length) && <p>No results</p>}
        <Styled.categoryConatainer>
          <Styled.title>Transfer</Styled.title>
          <CategoryItem
            label="Transfer"
            budgetType="transfer"
            amount={0}
            avatar={{ emoji: '🔀', backgroundColor: '' }}
            categoryClickCb={setAsTransfer}
          />
        </Styled.categoryConatainer>
        <Styled.fixedContainer>
          {currentCategoryId && (
            <FixedCategoryItem
              label="Add Category"
              budgetType="transfer"
              amount={0}
              avatar={{ emoji: '➕', backgroundColor: '' }}
              color={colors.grey[500]}
              categoryClickCb={toggleAddCategory}
            />
          )}
        </Styled.fixedContainer>
        <Styled.fixedContainer>
          {currentCategoryId && (
            <FixedCategoryItem
              label="Remove Category"
              budgetType="transfer"
              amount={0}
              avatar={{ emoji: 'X', backgroundColor: '' }}
              color={colors.error.main}
              categoryClickCb={categoryClick}
            />
          )}
        </Styled.fixedContainer>
      </Styled.container>
      {isAddCategoryOpen && (
        <EditOrAddCategoryDialog
          budgeted={0}
          closeCb={toggleAddCategory}
          closeOnOverlayClick={true}
          successCb={addBudgetCb}
          nextText="Add Category"
        />
      )}
    </>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    width: 250px;
    max-height: 500px;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    border-radius: 16px;
    border: 1px solid ${colors.grey[300]};
    background: ${colors.white.main};
    overflow: auto;
    box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
    color: ${colors.grey[700]};
  `,
  categoryConatainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  fixedContainer: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% + 40px);
    margin-left: -20px;
    padding: 0 20px;
    padding-top: 10px;
    border-top: 1px solid ${colors.grey[300]};
  `,
  title: styled.h1`
    color: ${colors.grey[700]};
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 4px;
  `,
  searchContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: transparent;
    border-bottom: 1px solid #ddd;
    background: transparent;
  `,
  searchInput: styled.input`
    width: 100%;
    border: none;
    padding: 10px;
    background: transparent;
    outline: none;
    font-size: 16px;
    color: #888;

    ::placeholder {
      color: #888;
    }
  `,
};
