import { ISelectOptionGroup, ISelectOption } from '@/atoms/select/BaseSelect';
import { ICategory } from '@/types/basic/Category.type';

const selectACategory = {
  displayName: 'Select a category',
  value: '',
} as ISelectOption;

export function categoryListToOptions(categoryList: Record<string, string>): ISelectOption[] {
  const options = Object.keys(categoryList).map((key) => ({
    value: key,
    displayName: categoryList[key],
  }));
  options.unshift({ value: '', displayName: 'Select category' });

  return options;
}

function categoryOptions(categories: ICategory[]): ISelectOption[] {
  return categories.map((category: ICategory) => ({
    value: category.id!,
    displayName: (category?.avatar?.emoji ? category?.avatar?.emoji + ' ' : '') + category.label,
  })) as ISelectOption[];
}

export function categoriesToOptions(categories: ICategory[]): ISelectOption[] {
  const options = categoryOptions(categories);

  options.unshift(selectACategory);

  return options;
}

export function categoriesToGroups(
  debitCategories: ICategory[],
  creditCategories: ICategory[],
  transferCategory: ICategory
): ISelectOptionGroup[] {
  return [
    { label: '', options: [selectACategory] },
    { label: 'Income Categories', options: categoryOptions(debitCategories) },
    { label: 'Expense Categories', options: categoryOptions(creditCategories) },
    { label: 'Transfer Category', options: categoryOptions([transferCategory]) },
  ];
}
