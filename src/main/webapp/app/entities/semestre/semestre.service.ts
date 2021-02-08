import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISemestre } from 'app/shared/model/semestre.model';

type EntityResponseType = HttpResponse<ISemestre>;
type EntityArrayResponseType = HttpResponse<ISemestre[]>;

@Injectable({ providedIn: 'root' })
export class SemestreService {
  public resourceUrl = SERVER_API_URL + 'api/semestres';

  constructor(protected http: HttpClient) {}

  create(semestre: ISemestre): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(semestre);
    return this.http
      .post<ISemestre>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(semestre: ISemestre): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(semestre);
    return this.http
      .put<ISemestre>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISemestre>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISemestre[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(semestre: ISemestre): ISemestre {
    const copy: ISemestre = Object.assign({}, semestre, {
      dateDebut: semestre.dateDebut && semestre.dateDebut.isValid() ? semestre.dateDebut.format(DATE_FORMAT) : undefined,
      dateFin: semestre.dateFin && semestre.dateFin.isValid() ? semestre.dateFin.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? moment(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((semestre: ISemestre) => {
        semestre.dateDebut = semestre.dateDebut ? moment(semestre.dateDebut) : undefined;
        semestre.dateFin = semestre.dateFin ? moment(semestre.dateFin) : undefined;
      });
    }
    return res;
  }
}
