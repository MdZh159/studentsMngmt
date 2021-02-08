import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';
import { FiliereDeleteDialogComponent } from './filiere-delete-dialog.component';

@Component({
  selector: 'jhi-filiere',
  templateUrl: './filiere.component.html',
})
export class FiliereComponent implements OnInit, OnDestroy {
  filieres?: IFiliere[];
  eventSubscriber?: Subscription;

  constructor(protected filiereService: FiliereService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.filiereService.query().subscribe((res: HttpResponse<IFiliere[]>) => (this.filieres = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFilieres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFiliere): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFilieres(): void {
    this.eventSubscriber = this.eventManager.subscribe('filiereListModification', () => this.loadAll());
  }

  delete(filiere: IFiliere): void {
    const modalRef = this.modalService.open(FiliereDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.filiere = filiere;
  }
}
