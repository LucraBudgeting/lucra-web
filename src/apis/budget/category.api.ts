import { category } from '@/components/category/category.type';
import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export default class CategoryApi extends BaseRepository {
  AddCategory = async (category: category): Promise<{ category: category; message: string }> => {
    const response = await HttpClient.post<{ category: category; message: string }>(
      `${this.apiUrl}/api/category`,
      category
    );
    return response;
  };

  GetCategories = async (): Promise<{ categories: category[]; message: string }> => {
    const response = await HttpClient.get<{ categories: category[]; message: string }>(
      `${this.apiUrl}/api/category`
    );
    return response;
  };
}
