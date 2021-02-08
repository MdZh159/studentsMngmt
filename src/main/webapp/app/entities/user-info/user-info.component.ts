import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserInfo } from 'app/shared/model/user-info.model';
import { UserInfoService } from './user-info.service';
import { UserInfoDeleteDialogComponent } from './user-info-delete-dialog.component';

@Component({
  selector: 'jhi-user-info',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent implements OnInit, OnDestroy {
  userInfos?: IUserInfo[];
  eventSubscriber?: Subscription;

  constructor(protected userInfoService: UserInfoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.userInfoService.query().subscribe((res: HttpResponse<IUserInfo[]>) => (this.userInfos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserInfos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserInfo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserInfos(): void {
    this.eventSubscriber = this.eventManager.subscribe('userInfoListModification', () => this.loadAll());
  }

  delete(userInfo: IUserInfo): void {
    const modalRef = this.modalService.open(UserInfoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userInfo = userInfo;
  }
}
