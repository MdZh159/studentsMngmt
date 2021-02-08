import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICours, Cours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module/module.service';

@Component({
  selector: 'jhi-cours-update',
  templateUrl: './cours-update.component.html',
})
export class CoursUpdateComponent implements OnInit {
  isSaving = false;
  modules: IModule[] = [];
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    description: [],
    nbHeures: [],
    dateDebut: [],
    dateFin: [],
    module: [],
  });

  constructor(
    protected coursService: CoursService,
    protected moduleService: ModuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cours }) => {
      this.updateForm(cours);

      this.moduleService.query().subscribe((res: HttpResponse<IModule[]>) => (this.modules = res.body || []));
    });
  }

  updateForm(cours: ICours): void {
    this.editForm.patchValue({
      id: cours.id,
      nom: cours.nom,
      description: cours.description,
      nbHeures: cours.nbHeures,
      dateDebut: cours.dateDebut,
      dateFin: cours.dateFin,
      module: cours.module,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cours = this.createFromForm();
    if (cours.id !== undefined) {
      this.subscribeToSaveResponse(this.coursService.update(cours));
    } else {
      this.subscribeToSaveResponse(this.coursService.create(cours));
    }
  }

  private createFromForm(): ICours {
    return {
      ...new Cours(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      description: this.editForm.get(['description'])!.value,
      nbHeures: this.editForm.get(['nbHeures'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      module: this.editForm.get(['module'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICours>>): void {
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

  trackById(index: number, item: IModule): any {
    return item.id;
  }
}
