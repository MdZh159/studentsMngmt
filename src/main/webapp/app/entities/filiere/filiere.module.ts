import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentsMngmtSharedModule } from 'app/shared/shared.module';
import { FiliereComponent } from './filiere.component';
import { FiliereDetailComponent } from './filiere-detail.component';
import { FiliereUpdateComponent } from './filiere-update.component';
import { FiliereDeleteDialogComponent } from './filiere-delete-dialog.component';
import { filiereRoute } from './filiere.route';

@NgModule({
  imports: [StudentsMngmtSharedModule, RouterModule.forChild(filiereRoute)],
  declarations: [FiliereComponent, FiliereDetailComponent, FiliereUpdateComponent, FiliereDeleteDialogComponent],
  entryComponents: [FiliereDeleteDialogComponent],
})
export class StudentsMngmtFiliereModule {}
