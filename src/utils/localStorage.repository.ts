import { getLocal, LocalKeys, removeLocal, setLocal } from './localStorage';

class LocalStorageRepository {
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
