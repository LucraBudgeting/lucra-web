import { balanceEntry } from '@/types/types';
import { IAvatar } from './_shared/avatar';

export interface ICategory {
  label: string;
  avatar: ICategoryAvatar;
  budgetType: balanceEntry;
  id?: string;
  amount: number;
}

export const transferCategoryId = 'transfer';
export interface ICategoryAvatar extends IAvatar {}
