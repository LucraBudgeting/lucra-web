import { BaseRepository } from '../base.repository';
import { category } from '@/components/category/category.type';
import HttpClient from '@/libs/http/http.client';

export default class CategoryApi extends BaseRepository {
  AddCategory = async (category: category): Promise<{ category: category; message: string }> => {
    const response = await HttpClient.post<{ category: category; message: string }>(
      `${this.apiUrl}/api/category`,
      category
    );
    return response;
  };
}
