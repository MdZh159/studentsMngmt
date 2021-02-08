import { IDepartement } from 'app/shared/model/departement.model';

export interface IFiliere {
  id?: number;
  nom?: string;
  prefixe?: string;
  description?: string;
  departement?: IDepartement;
}

export class Filiere implements IFiliere {
  constructor(
    public id?: number,
    public nom?: string,
    public prefixe?: string,
    public description?: string,
    public departement?: IDepartement
  ) {}
}
