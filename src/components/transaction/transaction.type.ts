import { category } from '../category/category.type';
export interface transaction {
  category?: category;
  amount: number;
  description: string;
  date: string;
  id: string;
}
