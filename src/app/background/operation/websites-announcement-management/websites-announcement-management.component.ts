import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {WebsitesAnnouncementService} from '../../../service/websites-announcement/websites-announcement.service';
import {AnnouncementEditModalComponent} from '../../../core/modal/announcement-edit-modal/announcement-edit-modal.component';

@Component({
  selector: 'app-websites-announcement-management',
  templateUrl: './websites-announcement-management.component.html',
  styleUrls: ['./websites-announcement-management.component.less']
})
export class WebsitesAnnouncementManagementComponent implements OnInit {
  dataList = [];
  displayData = [];
  loading = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  userId = '1';
  constructor(
    private websitesAnnouncementService$: WebsitesAnnouncementService ,
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private _notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.websitesAnnouncementService$.getAnnouncementList(pageIndex, 10).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.data;
      this.displayData = this.dataList;
    }, error1 => {
      this.loading = false;
      this._message.error(error1.error)
    });
  }

  openCreateAnnouncementModal() {
    const modal = this._modalService.create({
      nzTitle: '新建公告',
      nzContent: AnnouncementEditModalComponent,
      nzComponentParams: {
        mode: 'create',
        userId: this.userId
      },
      nzWidth: 600,
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result == 'success') {
        this.searchData()
      }
    })
  }

  edit(data: any) {
    const modal = this._modalService.create({
      nzTitle: '编辑公告',
      nzContent: AnnouncementEditModalComponent,
      nzWidth: 600,
      nzComponentParams: {
        data: data,
        mode: 'edit',
        userId: this.userId
      },
      nzOnOk: instance => instance.submit(),
      nzOnCancel: instance => instance.destroy()
    });
    modal.afterClose.subscribe(result => {
      if (result == 'success') {
        this.searchData()
      }
    })
  }

  delete(id: string) {
    this._modalService.confirm({
      nzTitle: '是否要删除该条公告？',
      nzOnOk: () => this.websitesAnnouncementService$.deleteAnnouncement(id).subscribe(result => {
        this.searchData();
        this._notification.success('成功删除公告！','')
      }, error1 => this._notification.error('发生错误！', `${error1.error}`))
    })
  }

}
