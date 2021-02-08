import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISemestre } from 'app/shared/model/semestre.model';
import { SemestreService } from './semestre.service';
import { SemestreDeleteDialogComponent } from './semestre-delete-dialog.component';

@Component({
  selector: 'jhi-semestre',
  templateUrl: './semestre.component.html',
})
export class SemestreComponent implements OnInit, OnDestroy {
  semestres?: ISemestre[];
  eventSubscriber?: Subscription;

  constructor(protected semestreService: SemestreService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.semestreService.query().subscribe((res: HttpResponse<ISemestre[]>) => (this.semestres = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSemestres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISemestre): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSemestres(): void {
    this.eventSubscriber = this.eventManager.subscribe('semestreListModification', () => this.loadAll());
  }

  delete(semestre: ISemestre): void {
    const modalRef = this.modalService.open(SemestreDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.semestre = semestre;
  }
}
