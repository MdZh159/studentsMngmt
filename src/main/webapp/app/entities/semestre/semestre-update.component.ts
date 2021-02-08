import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISemestre, Semestre } from 'app/shared/model/semestre.model';
import { SemestreService } from './semestre.service';

@Component({
  selector: 'jhi-semestre-update',
  templateUrl: './semestre-update.component.html',
})
export class SemestreUpdateComponent implements OnInit {
  isSaving = false;
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    dateDebut: [],
    dateFin: [],
  });

  constructor(protected semestreService: SemestreService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ semestre }) => {
      this.updateForm(semestre);
    });
  }

  updateForm(semestre: ISemestre): void {
    this.editForm.patchValue({
      id: semestre.id,
      nom: semestre.nom,
      dateDebut: semestre.dateDebut,
      dateFin: semestre.dateFin,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const semestre = this.createFromForm();
    if (semestre.id !== undefined) {
      this.subscribeToSaveResponse(this.semestreService.update(semestre));
    } else {
      this.subscribeToSaveResponse(this.semestreService.create(semestre));
    }
  }

  private createFromForm(): ISemestre {
    return {
      ...new Semestre(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISemestre>>): void {
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
}
