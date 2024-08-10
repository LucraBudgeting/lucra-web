import { IBaseModel } from '../base.model';

export interface UserModel extends IBaseModel {
  userId: string;
  phoneNumber: string | null;
  email: string;
  name: string;
}
