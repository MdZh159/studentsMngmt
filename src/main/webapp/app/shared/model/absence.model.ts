import { Moment } from 'moment';
import { ICours } from 'app/shared/model/cours.model';
import { IUser } from 'app/core/user/user.model';

export interface IAbsence {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  justification?: string;
  cours?: ICours;
  user?: IUser;
}

export class Absence implements IAbsence {
  constructor(
    public id?: number,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public justification?: string,
    public cours?: ICours,
    public user?: IUser
  ) {}
}
