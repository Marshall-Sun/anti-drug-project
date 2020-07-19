import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {NoticeManagementService} from '../../../service/notice-management/notice-management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-notice-management',
  templateUrl: './notice-management.component.html',
  styleUrls: ['./notice-management.component.less']
})
export class NoticeManagementComponent implements OnInit {
  dataList = [];
  displayData = [];
  loading = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  newNoticeForm: FormGroup;

  title: string = '';
  time: string = '';
  noticeContent: string = '';

  userId = 1;

  constructor(
    private noticeManagementService$: NoticeManagementService ,
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private  _notification: NzNotificationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchData();
    this.newNoticeForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.noticeManagementService$.getMessageList(pageIndex, 10).subscribe(result => {
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

  openCreateNoticeModal(template: TemplateRef<{}>) {
    const modal = this._modalService.create({
      nzTitle: '发布站内信通告',
      nzContent: template,
      nzOnOk: () => {
        this.newNoticeForm.markAllAsTouched();
        this.newNoticeForm.controls.title.updateValueAndValidity();
        this.newNoticeForm.controls.content.updateValueAndValidity();
        let shouldBeClose = false;
        if (this.newNoticeForm.status == 'VALID') {
          this.noticeManagementService$.createNewNotification(this.newNoticeForm.controls.content.value, this.userId, this.newNoticeForm.controls.title.value).subscribe(result => {
            this._notification.success('成功发送通知！', '');
            this.searchData();
            this.newNoticeForm.reset();
            modal.destroy()
          }, error1 => {
            this._notification.error('发生错误！', `${error1.error}`);
          })
        }
        return shouldBeClose
      },
      nzOnCancel: () => {
        this.newNoticeForm.reset()
      }
    })
  }

  checkDetail(data: any, template: TemplateRef<{}>) {
    this.title = data.title;
    this.time = data.sendedTime;
    this.noticeContent = data.content;
    const modal = this._modalService.create({
      nzTitle: '查看通知详情',
      nzContent: template,
      nzOnOk: () => modal.destroy()
    });
    modal.afterClose.subscribe( () => {
      this.time = '';
      this.title = '';
      this.noticeContent = ''
    })
  }

  publish(id: string) {
    this._modalService.confirm({
      nzTitle: '是否要发布该条通知？',
      nzOnOk: () => console.log('111')
    })
  }

  delete(id: string) {
    this.noticeManagementService$.deleteNotification(id).subscribe(result => {
      this._notification.success('删除成功！', '');
      this.searchData()
    }, error1 => {
      this._notification.error('删除失败！', `${error1.error}`)
    })
  }
}
