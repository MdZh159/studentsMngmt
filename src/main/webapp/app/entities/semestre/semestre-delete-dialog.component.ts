import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISemestre } from 'app/shared/model/semestre.model';
import { SemestreService } from './semestre.service';

@Component({
  templateUrl: './semestre-delete-dialog.component.html',
})
export class SemestreDeleteDialogComponent {
  semestre?: ISemestre;

  constructor(protected semestreService: SemestreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.semestreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('semestreListModification');
      this.activeModal.close();
    });
  }
}
