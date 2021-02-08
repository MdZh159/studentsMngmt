import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAbsence } from 'app/shared/model/absence.model';
import { AbsenceService } from './absence.service';
import { AbsenceDeleteDialogComponent } from './absence-delete-dialog.component';

@Component({
  selector: 'jhi-absence',
  templateUrl: './absence.component.html',
})
export class AbsenceComponent implements OnInit, OnDestroy {
  absences?: IAbsence[];
  eventSubscriber?: Subscription;

  constructor(protected absenceService: AbsenceService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.absenceService.query().subscribe((res: HttpResponse<IAbsence[]>) => (this.absences = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAbsences();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAbsence): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAbsences(): void {
    this.eventSubscriber = this.eventManager.subscribe('absenceListModification', () => this.loadAll());
  }

  delete(absence: IAbsence): void {
    const modalRef = this.modalService.open(AbsenceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.absence = absence;
  }
}
