import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INote, Note } from 'app/shared/model/note.model';
import { NoteService } from './note.service';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module/module.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IModule | IUser;

@Component({
  selector: 'jhi-note-update',
  templateUrl: './note-update.component.html',
})
export class NoteUpdateComponent implements OnInit {
  isSaving = false;
  modules: IModule[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    noteGrade: [],
    remarque: [],
    module: [],
    user: [],
  });

  constructor(
    protected noteService: NoteService,
    protected moduleService: ModuleService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ note }) => {
      this.updateForm(note);

      this.moduleService
        .query({ filter: 'note-is-null' })
        .pipe(
          map((res: HttpResponse<IModule[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IModule[]) => {
          if (!note.module || !note.module.id) {
            this.modules = resBody;
          } else {
            this.moduleService
              .find(note.module.id)
              .pipe(
                map((subRes: HttpResponse<IModule>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IModule[]) => (this.modules = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(note: INote): void {
    this.editForm.patchValue({
      id: note.id,
      noteGrade: note.noteGrade,
      remarque: note.remarque,
      module: note.module,
      user: note.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const note = this.createFromForm();
    if (note.id !== undefined) {
      this.subscribeToSaveResponse(this.noteService.update(note));
    } else {
      this.subscribeToSaveResponse(this.noteService.create(note));
    }
  }

  private createFromForm(): INote {
    return {
      ...new Note(),
      id: this.editForm.get(['id'])!.value,
      noteGrade: this.editForm.get(['noteGrade'])!.value,
      remarque: this.editForm.get(['remarque'])!.value,
      module: this.editForm.get(['module'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INote>>): void {
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
