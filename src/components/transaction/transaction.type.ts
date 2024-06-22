import { ICategory } from '../../types/basic/Category.type';
export interface transaction {
  category?: ICategory;
  amount: number;
  description: string;
  date: string;
  id: string;
}
