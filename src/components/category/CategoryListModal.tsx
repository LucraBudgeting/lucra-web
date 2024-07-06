import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SpyGlassOutline } from '@/assets/spyglass-outline';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { useOutsideClickRef } from '@/hooks/react/useOutsideClickRef';
import { ICategory } from '../../types/basic/Category.type';
import { CategoryItem } from './CategoryItem';

interface CategoryListProps {
  parentRef: React.RefObject<HTMLDivElement>;
  categoryClickCb: (id?: string) => void;
  outsideClickCb?: () => void;
}

export const CategoryListModal: FC<CategoryListProps> = ({
  parentRef,
  categoryClickCb,
  outsideClickCb,
}) => {
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({
    display: 'none',
  });

  const modalRef = useOutsideClickRef(outsideClickCb);

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const availableHeightBelow = window.innerHeight - rect.bottom;
      const availableHeightAbove = rect.top;
      const availableWidthRight = window.innerWidth - rect.right;
      const modalHeight = 400;
      const modalWidth = 50;

      let top = rect.bottom + window.scrollY;
      let left = rect.left + window.scrollX;

      if (availableHeightBelow < modalHeight && availableHeightAbove > modalHeight) {
        top = rect.top + window.scrollY - modalHeight;
      }

      if (availableWidthRight < modalWidth) {
        left = rect.left + window.scrollX - modalWidth;
      }

      setModalStyle({
        position: 'absolute',
        top,
        left,
        height: `${modalHeight}px`,
      });
    }
  }, [parentRef]);

  const { debitCategories, creditCategories } = dashboardSelector();
  const [searchValue, setSearchValue] = useState('');
  const [incomeList, setIncomeList] = useState<ICategory[]>(creditCategories);
  const [expenseList, setExpenseList] = useState<ICategory[]>(debitCategories);

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

  return (
    <Styled.container ref={modalRef} style={modalStyle}>
      <Styled.searchContainer>
        <SpyGlassOutline />
        <Styled.searchInput
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => filterCategories(e.target.value)}
        />
      </Styled.searchContainer>
      <Styled.title>Income</Styled.title>
      {incomeList.map((income) => (
        <CategoryItem key={income.id} {...income} categoryClickCb={categoryClickCb} />
      ))}
      <Styled.title>Expense</Styled.title>
      {expenseList.map((expense) => (
        <CategoryItem key={expense.id} {...expense} categoryClickCb={categoryClickCb} />
      ))}
      <Styled.title>Remove</Styled.title>
      <CategoryItem
        label="Remove Category"
        budgetType="credit"
        amount={0}
        avatar={{ emoji: '❌', backgroundColor: '' }}
        categoryClickCb={categoryClickCb}
      />
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    width: 250px;
    height: 500px;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    border-radius: 16px;
    border: 1px solid var(--Grey-Stroke, #e2e2e2);
    background: var(--Grey-White, #fff);
    overflow: auto;
    box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
  `,
  title: styled.h1`
    color: var(--Grey-Dark, #333);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  `,
  searchContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: #f0f0f0;
    border-bottom: 1px solid #ddd;
    border-radius: 5px;
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
