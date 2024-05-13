import { balanceEntry } from '@/types/types';

export interface category {
  label: string;
  emoji?: string;
  backgroundColor?: string;
  budgetType?: balanceEntry;
  id?: string;
}
