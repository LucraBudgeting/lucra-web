import HttpClient from '@/libs/http/http.client';
import { ICategory } from '@/types/basic/Category.type';
import { BaseRepository } from '../base.repository';

export default class CategoryApi extends BaseRepository {
  AddCategory = async (category: ICategory): Promise<{ category: ICategory; message: string }> => {
    const response = await HttpClient.post<{ category: ICategory; message: string }>(
      `${this.apiUrl}/api/category`,
      category
    );
    return response;
  };

  GetCategories = async (): Promise<{ categories: ICategory[]; message: string }> => {
    const response = await HttpClient.get<{ categories: ICategory[]; message: string }>(
      `${this.apiUrl}/api/category`
    );
    return response;
  };

  UpdateCategory = async (
    category: ICategory
  ): Promise<{ categories: ICategory[]; message: string }> => {
    const response = await HttpClient.put<{ categories: ICategory[]; message: string }>(
      `${this.apiUrl}/api/category`,
      category
    );
    return response;
  };
}
