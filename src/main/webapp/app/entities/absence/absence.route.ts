import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAbsence, Absence } from 'app/shared/model/absence.model';
import { AbsenceService } from './absence.service';
import { AbsenceComponent } from './absence.component';
import { AbsenceDetailComponent } from './absence-detail.component';
import { AbsenceUpdateComponent } from './absence-update.component';

@Injectable({ providedIn: 'root' })
export class AbsenceResolve implements Resolve<IAbsence> {
  constructor(private service: AbsenceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAbsence> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((absence: HttpResponse<Absence>) => {
          if (absence.body) {
            return of(absence.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Absence());
  }
}

export const absenceRoute: Routes = [
  {
    path: '',
    component: AbsenceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.absence.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AbsenceDetailComponent,
    resolve: {
      absence: AbsenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.absence.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AbsenceUpdateComponent,
    resolve: {
      absence: AbsenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.absence.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AbsenceUpdateComponent,
    resolve: {
      absence: AbsenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.absence.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
