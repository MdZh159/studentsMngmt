import { IUser } from 'app/core/user/user.model';

export interface IUserInfo {
  id?: number;
  phone?: string;
  adresse?: string;
  ville?: string;
  age?: number;
  fonction?: string;
  user?: IUser;
}

export class UserInfo implements IUserInfo {
  constructor(
    public id?: number,
    public phone?: string,
    public adresse?: string,
    public ville?: string,
    public age?: number,
    public fonction?: string,
    public user?: IUser
  ) {}
}
