import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';

@Component({
  templateUrl: './cours-delete-dialog.component.html',
})
export class CoursDeleteDialogComponent {
  cours?: ICours;

  constructor(protected coursService: CoursService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.coursService.delete(id).subscribe(() => {
      this.eventManager.broadcast('coursListModification');
      this.activeModal.close();
    });
  }
}
