import { Moment } from 'moment';
import { IFiliere } from 'app/shared/model/filiere.model';
import { ISemestre } from 'app/shared/model/semestre.model';

export interface IModule {
  id?: number;
  nom?: string;
  prefixe?: string;
  description?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
  filiere?: IFiliere;
  semestre?: ISemestre;
}

export class Module implements IModule {
  constructor(
    public id?: number,
    public nom?: string,
    public prefixe?: string,
    public description?: string,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public filiere?: IFiliere,
    public semestre?: ISemestre
  ) {}
}
