export interface AuthResponse<T> {
  user: T;
  accessToken: string;
  doesNeedSync: boolean;
}
