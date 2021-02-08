import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAbsence } from 'app/shared/model/absence.model';
import { AbsenceService } from './absence.service';

@Component({
  templateUrl: './absence-delete-dialog.component.html',
})
export class AbsenceDeleteDialogComponent {
  absence?: IAbsence;

  constructor(protected absenceService: AbsenceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.absenceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('absenceListModification');
      this.activeModal.close();
    });
  }
}
