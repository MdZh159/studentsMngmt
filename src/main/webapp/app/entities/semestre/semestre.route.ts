import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISemestre, Semestre } from 'app/shared/model/semestre.model';
import { SemestreService } from './semestre.service';
import { SemestreComponent } from './semestre.component';
import { SemestreDetailComponent } from './semestre-detail.component';
import { SemestreUpdateComponent } from './semestre-update.component';

@Injectable({ providedIn: 'root' })
export class SemestreResolve implements Resolve<ISemestre> {
  constructor(private service: SemestreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISemestre> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((semestre: HttpResponse<Semestre>) => {
          if (semestre.body) {
            return of(semestre.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Semestre());
  }
}

export const semestreRoute: Routes = [
  {
    path: '',
    component: SemestreComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.semestre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SemestreDetailComponent,
    resolve: {
      semestre: SemestreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.semestre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SemestreUpdateComponent,
    resolve: {
      semestre: SemestreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.semestre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SemestreUpdateComponent,
    resolve: {
      semestre: SemestreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.semestre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
