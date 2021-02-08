export interface IDepartement {
  id?: number;
  nom?: string;
  prefixe?: string;
  description?: string;
}

export class Departement implements IDepartement {
  constructor(public id?: number, public nom?: string, public prefixe?: string, public description?: string) {}
}
