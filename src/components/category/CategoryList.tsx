import { FC, useState } from 'react';
import { category } from './category.type';
import styled from 'styled-components';
import { CategoryItem } from './CategoryItem';
import { SpyGlassOutline } from '@/assets/spyglass-outline';

interface CategoryListProps {
  incomes: category[];
  expenses: category[];
}

export const CategoryList: FC<CategoryListProps> = ({ incomes, expenses }) => {
  const [searchValue, setSearchValue] = useState('');
  const [incomeList, setIncomeList] = useState<category[]>(incomes);
  const [expenseList, setExpenseList] = useState<category[]>(expenses);

  const filterCategories = (value: string) => {
    const incomeCategories = incomes.filter((category) =>
      category.label.toLowerCase().includes(value.toLowerCase())
    );
    const expenseCategories = expenses.filter((category) =>
      category.label.toLowerCase().includes(value.toLowerCase())
    );

    setIncomeList(incomeCategories);
    setExpenseList(expenseCategories);
    setSearchValue(value);
  };

  return (
    <Styled.container>
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
        <CategoryItem key={income.id} {...income} />
      ))}
      <Styled.title>Expense</Styled.title>
      {expenseList.map((expense) => (
        <CategoryItem key={expense.id} {...expense} />
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
