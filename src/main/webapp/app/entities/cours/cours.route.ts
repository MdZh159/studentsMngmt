import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICours, Cours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';
import { CoursComponent } from './cours.component';
import { CoursDetailComponent } from './cours-detail.component';
import { CoursUpdateComponent } from './cours-update.component';

@Injectable({ providedIn: 'root' })
export class CoursResolve implements Resolve<ICours> {
  constructor(private service: CoursService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICours> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cours: HttpResponse<Cours>) => {
          if (cours.body) {
            return of(cours.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cours());
  }
}

export const coursRoute: Routes = [
  {
    path: '',
    component: CoursComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.cours.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CoursDetailComponent,
    resolve: {
      cours: CoursResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.cours.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CoursUpdateComponent,
    resolve: {
      cours: CoursResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.cours.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CoursUpdateComponent,
    resolve: {
      cours: CoursResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'studentsMngmtApp.cours.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
