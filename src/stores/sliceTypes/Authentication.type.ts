export interface IAuthenticationState {
  userId: string;
  phoneNumber: string | null;
  token: string;
  email: string;
}
