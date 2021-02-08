import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentsMngmtSharedModule } from 'app/shared/shared.module';
import { DepartementComponent } from './departement.component';
import { DepartementDetailComponent } from './departement-detail.component';
import { DepartementUpdateComponent } from './departement-update.component';
import { DepartementDeleteDialogComponent } from './departement-delete-dialog.component';
import { departementRoute } from './departement.route';

@NgModule({
  imports: [StudentsMngmtSharedModule, RouterModule.forChild(departementRoute)],
  declarations: [DepartementComponent, DepartementDetailComponent, DepartementUpdateComponent, DepartementDeleteDialogComponent],
  entryComponents: [DepartementDeleteDialogComponent],
})
export class StudentsMngmtDepartementModule {}
