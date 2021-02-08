import { Moment } from 'moment';
import { IModule } from 'app/shared/model/module.model';

export interface ICours {
  id?: number;
  nom?: string;
  description?: string;
  nbHeures?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  module?: IModule;
}

export class Cours implements ICours {
  constructor(
    public id?: number,
    public nom?: string,
    public description?: string,
    public nbHeures?: number,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public module?: IModule
  ) {}
}
