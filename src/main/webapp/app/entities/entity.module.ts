import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'departement',
        loadChildren: () => import('./departement/departement.module').then(m => m.StudentsMngmtDepartementModule),
      },
      {
        path: 'filiere',
        loadChildren: () => import('./filiere/filiere.module').then(m => m.StudentsMngmtFiliereModule),
      },
      {
        path: 'module',
        loadChildren: () => import('./module/module.module').then(m => m.StudentsMngmtModuleModule),
      },
      {
        path: 'cours',
        loadChildren: () => import('./cours/cours.module').then(m => m.StudentsMngmtCoursModule),
      },
      {
        path: 'semestre',
        loadChildren: () => import('./semestre/semestre.module').then(m => m.StudentsMngmtSemestreModule),
      },
      {
        path: 'note',
        loadChildren: () => import('./note/note.module').then(m => m.StudentsMngmtNoteModule),
      },
      {
        path: 'absence',
        loadChildren: () => import('./absence/absence.module').then(m => m.StudentsMngmtAbsenceModule),
      },
      {
        path: 'user-info',
        loadChildren: () => import('./user-info/user-info.module').then(m => m.StudentsMngmtUserInfoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class StudentsMngmtEntityModule {}
