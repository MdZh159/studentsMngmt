import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from './module.service';
import { ModuleDeleteDialogComponent } from './module-delete-dialog.component';

@Component({
  selector: 'jhi-module',
  templateUrl: './module.component.html',
})
export class ModuleComponent implements OnInit, OnDestroy {
  modules?: IModule[];
  eventSubscriber?: Subscription;

  constructor(protected moduleService: ModuleService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.moduleService.query().subscribe((res: HttpResponse<IModule[]>) => (this.modules = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInModules();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IModule): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInModules(): void {
    this.eventSubscriber = this.eventManager.subscribe('moduleListModification', () => this.loadAll());
  }

  delete(module: IModule): void {
    const modalRef = this.modalService.open(ModuleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.module = module;
  }
}
