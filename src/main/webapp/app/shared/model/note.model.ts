import { IModule } from 'app/shared/model/module.model';
import { IUser } from 'app/core/user/user.model';

export interface INote {
  id?: number;
  noteGrade?: number;
  remarque?: string;
  module?: IModule;
  user?: IUser;
}

export class Note implements INote {
  constructor(public id?: number, public noteGrade?: number, public remarque?: string, public module?: IModule, public user?: IUser) {}
}
