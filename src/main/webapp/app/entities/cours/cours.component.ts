import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';
import { CoursDeleteDialogComponent } from './cours-delete-dialog.component';

@Component({
  selector: 'jhi-cours',
  templateUrl: './cours.component.html',
})
export class CoursComponent implements OnInit, OnDestroy {
  cours?: ICours[];
  eventSubscriber?: Subscription;

  constructor(protected coursService: CoursService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.coursService.query().subscribe((res: HttpResponse<ICours[]>) => (this.cours = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCours();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICours): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCours(): void {
    this.eventSubscriber = this.eventManager.subscribe('coursListModification', () => this.loadAll());
  }

  delete(cours: ICours): void {
    const modalRef = this.modalService.open(CoursDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cours = cours;
  }
}
