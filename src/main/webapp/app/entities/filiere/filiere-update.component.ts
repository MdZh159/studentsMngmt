import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFiliere, Filiere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement/departement.service';

@Component({
  selector: 'jhi-filiere-update',
  templateUrl: './filiere-update.component.html',
})
export class FiliereUpdateComponent implements OnInit {
  isSaving = false;
  departements: IDepartement[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    prefixe: [],
    description: [],
    departement: [],
  });

  constructor(
    protected filiereService: FiliereService,
    protected departementService: DepartementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ filiere }) => {
      this.updateForm(filiere);

      this.departementService.query().subscribe((res: HttpResponse<IDepartement[]>) => (this.departements = res.body || []));
    });
  }

  updateForm(filiere: IFiliere): void {
    this.editForm.patchValue({
      id: filiere.id,
      nom: filiere.nom,
      prefixe: filiere.prefixe,
      description: filiere.description,
      departement: filiere.departement,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const filiere = this.createFromForm();
    if (filiere.id !== undefined) {
      this.subscribeToSaveResponse(this.filiereService.update(filiere));
    } else {
      this.subscribeToSaveResponse(this.filiereService.create(filiere));
    }
  }

  private createFromForm(): IFiliere {
    return {
      ...new Filiere(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prefixe: this.editForm.get(['prefixe'])!.value,
      description: this.editForm.get(['description'])!.value,
      departement: this.editForm.get(['departement'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFiliere>>): void {
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

  trackById(index: number, item: IDepartement): any {
    return item.id;
  }
}
