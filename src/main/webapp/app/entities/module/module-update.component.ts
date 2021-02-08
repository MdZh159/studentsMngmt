import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IModule, Module } from 'app/shared/model/module.model';
import { ModuleService } from './module.service';
import { IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from 'app/entities/filiere/filiere.service';
import { ISemestre } from 'app/shared/model/semestre.model';
import { SemestreService } from 'app/entities/semestre/semestre.service';

type SelectableEntity = IFiliere | ISemestre;

@Component({
  selector: 'jhi-module-update',
  templateUrl: './module-update.component.html',
})
export class ModuleUpdateComponent implements OnInit {
  isSaving = false;
  filieres: IFiliere[] = [];
  semestres: ISemestre[] = [];
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    prefixe: [],
    description: [],
    dateDebut: [],
    dateFin: [],
    filiere: [],
    semestre: [],
  });

  constructor(
    protected moduleService: ModuleService,
    protected filiereService: FiliereService,
    protected semestreService: SemestreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ module }) => {
      this.updateForm(module);

      this.filiereService.query().subscribe((res: HttpResponse<IFiliere[]>) => (this.filieres = res.body || []));

      this.semestreService.query().subscribe((res: HttpResponse<ISemestre[]>) => (this.semestres = res.body || []));
    });
  }

  updateForm(module: IModule): void {
    this.editForm.patchValue({
      id: module.id,
      nom: module.nom,
      prefixe: module.prefixe,
      description: module.description,
      dateDebut: module.dateDebut,
      dateFin: module.dateFin,
      filiere: module.filiere,
      semestre: module.semestre,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const module = this.createFromForm();
    if (module.id !== undefined) {
      this.subscribeToSaveResponse(this.moduleService.update(module));
    } else {
      this.subscribeToSaveResponse(this.moduleService.create(module));
    }
  }

  private createFromForm(): IModule {
    return {
      ...new Module(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prefixe: this.editForm.get(['prefixe'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      filiere: this.editForm.get(['filiere'])!.value,
      semestre: this.editForm.get(['semestre'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModule>>): void {
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
