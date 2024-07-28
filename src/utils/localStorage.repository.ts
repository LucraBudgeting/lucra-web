import { getLocal, LocalKeys, removeLocal, setLocal } from './localStorage';

class LocalStorageRepository {
  public getCategoryList(): Record<string, string> | null {
    const categories = getLocal(LocalKeys.CATEGORY_LIST);
    if (!categories) {
      return null;
    }

    const parsedCategories = JSON.parse(categories);

    const lastMonth = new Date();
    lastMonth.setDate(new Date().getDate() - 30);

    const dateToCheck = new Date(parsedCategories?.dateSaved);

    if (dateToCheck > lastMonth) {
      return parsedCategories.categories;
    }

    return null;
  }

  public setCategoryList(categories: Record<string, string>): void {
    const toSave = {
      categories,
      dateSaved: new Date().toISOString(),
    };
    setLocal(LocalKeys.CATEGORY_LIST, JSON.stringify(toSave));
  }

  public getUserToken(): string | null {
    const adminToken = this.getAdminUserToken();
    if (adminToken) return adminToken;

    return null;
  }
  public getAdminUserToken(): string | null {
    const userToken = getLocal(LocalKeys.ADMIN_USER_TOKEN);
    if (userToken) return userToken;
    return null;
  }

  public setUserToken(userToken: string): void {
    setLocal(LocalKeys.ADMIN_USER_TOKEN, userToken);
  }

  public deleteUserToken(): void {
    removeLocal(LocalKeys.ADMIN_USER_TOKEN);
  }
}

export default new LocalStorageRepository();
