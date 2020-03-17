import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInsurance, Insurance } from 'app/shared/model/insurance.model';
import { InsuranceService } from './insurance.service';
import { InsuranceComponent } from './insurance.component';
import { InsuranceDetailComponent } from './insurance-detail.component';
import { InsuranceUpdateComponent } from './insurance-update.component';

@Injectable({ providedIn: 'root' })
export class InsuranceResolve implements Resolve<IInsurance> {
  constructor(private service: InsuranceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInsurance> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((insurance: HttpResponse<Insurance>) => {
          if (insurance.body) {
            return of(insurance.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Insurance());
  }
}

export const insuranceRoute: Routes = [
  {
    path: '',
    component: InsuranceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceApp.insurance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InsuranceDetailComponent,
    resolve: {
      insurance: InsuranceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceApp.insurance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InsuranceUpdateComponent,
    resolve: {
      insurance: InsuranceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceApp.insurance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InsuranceUpdateComponent,
    resolve: {
      insurance: InsuranceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceApp.insurance.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
