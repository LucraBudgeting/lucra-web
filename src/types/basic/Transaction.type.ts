import { IIsoCurrencyCode } from './_shared/db.enum';

export interface ITransaction {
  id: string;
  userId: string;
  accountId?: string;
  amount: number;
  date: string;
  isoCurrencyCode: IIsoCurrencyCode;
  merchantName: string | null;
  name: string | null;
  pending: boolean;
  isExcludedFromBudget: boolean;
  paymentChannel: string;
  addressId: string | null;
  categoryId?: string | null;
  categoryPrimary?: string | null;
  categoryDetailed?: string | null;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface ITransactionPatchDto {
  categoryId?: string;
  excludeFromBudget?: boolean;
}
