import { balanceEntry } from '../types';
import { IAvatar } from './_shared/avatar';

export interface IBudget {
  id?: string;
  label: string;
  budgetType?: balanceEntry;
  amount?: number;
}

export interface IBudgetAvatar extends IAvatar {}
