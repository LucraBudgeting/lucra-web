import { balanceEntry } from '@/types/types';

export interface ICategory {
  label: string;
  emoji?: string;
  backgroundColor?: string;
  budgetType?: balanceEntry;
  id?: string;
  amount?: number;
}
