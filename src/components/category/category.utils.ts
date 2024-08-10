import { ISelectOptions } from '@/atoms/select/BaseSelect';
import { ICategory } from '@/types/basic/Category.type';

const selectACategory = {
  displayName: 'Select a category',
  value: '',
} as ISelectOptions;

export function categoryListToOptions(categoryList: Record<string, string>): ISelectOptions[] {
  const options = Object.keys(categoryList).map((key) => ({
    value: key,
    displayName: categoryList[key],
  }));
  options.unshift({ value: '', displayName: 'Select category' });

  return options;
}

export function categoriesToOptions(categories: ICategory[]): ISelectOptions[] {
  const options = categories.map((category: ICategory) => ({
    value: category.id!,
    displayName: (category?.avatar?.emoji ? category?.avatar?.emoji + ' ' : '') + category.label,
  })) as ISelectOptions[];

  options.unshift(selectACategory);

  return options;
}
