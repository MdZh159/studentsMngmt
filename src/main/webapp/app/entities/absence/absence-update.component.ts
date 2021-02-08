import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAbsence, Absence } from 'app/shared/model/absence.model';
import { AbsenceService } from './absence.service';
import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from 'app/entities/cours/cours.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = ICours | IUser;

@Component({
  selector: 'jhi-absence-update',
  templateUrl: './absence-update.component.html',
})
export class AbsenceUpdateComponent implements OnInit {
  isSaving = false;
  cours: ICours[] = [];
  users: IUser[] = [];
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    id: [],
    dateDebut: [],
    dateFin: [],
    justification: [],
    cours: [],
    user: [],
  });

  constructor(
    protected absenceService: AbsenceService,
    protected coursService: CoursService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ absence }) => {
      this.updateForm(absence);

      this.coursService
        .query({ filter: 'absence-is-null' })
        .pipe(
          map((res: HttpResponse<ICours[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICours[]) => {
          if (!absence.cours || !absence.cours.id) {
            this.cours = resBody;
          } else {
            this.coursService
              .find(absence.cours.id)
              .pipe(
                map((subRes: HttpResponse<ICours>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICours[]) => (this.cours = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(absence: IAbsence): void {
    this.editForm.patchValue({
      id: absence.id,
      dateDebut: absence.dateDebut,
      dateFin: absence.dateFin,
      justification: absence.justification,
      cours: absence.cours,
      user: absence.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const absence = this.createFromForm();
    if (absence.id !== undefined) {
      this.subscribeToSaveResponse(this.absenceService.update(absence));
    } else {
      this.subscribeToSaveResponse(this.absenceService.create(absence));
    }
  }

  private createFromForm(): IAbsence {
    return {
      ...new Absence(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      justification: this.editForm.get(['justification'])!.value,
      cours: this.editForm.get(['cours'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAbsence>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
