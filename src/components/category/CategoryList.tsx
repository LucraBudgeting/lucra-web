import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SpyGlassOutline } from '@/assets/spyglass-outline';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { ICategory } from '../../types/basic/Category.type';
import { CategoryItem } from './CategoryItem';

interface CategoryListProps {
  parentRef: React.RefObject<HTMLDivElement>;
  categoryClickCb: (id: string) => void;
  outsideClickCb?: () => void;
}

export const CategoryList: FC<CategoryListProps> = ({
  parentRef,
  categoryClickCb,
  outsideClickCb,
}) => {
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({
    display: 'none',
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!outsideClickCb) return;

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        parentRef.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        outsideClickCb();
      }
    },
    [modalRef, parentRef]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setModalStyle({
        position: 'absolute',
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX + 125,
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
