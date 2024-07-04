import { IIsoCurrencyCode, IPaymentChannel } from './_shared/db.enum';

export interface ITransaction {
  id: string;
  userId: string;
  amount: number;
  date: string;
  isoCurrencyCode: IIsoCurrencyCode;
  merchantName: string | null;
  name: string | null;
  pending: boolean;
  paymentChannel: IPaymentChannel;
  addressId: string | null;
  categoryId?: string | null;
  dateCreated: Date;
  dateUpdated: Date;
}
