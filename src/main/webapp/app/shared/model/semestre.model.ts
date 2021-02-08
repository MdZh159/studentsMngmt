import { Moment } from 'moment';

export interface ISemestre {
  id?: number;
  nom?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
}

export class Semestre implements ISemestre {
  constructor(public id?: number, public nom?: string, public dateDebut?: Moment, public dateFin?: Moment) {}
}
