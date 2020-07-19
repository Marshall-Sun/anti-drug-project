import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {UserApprovalService} from '../../../../service/user-approval/user-approval.service';
import {NzMessageService, NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-approval-pending-table',
  templateUrl: './approval-pending-table.component.html',
  styleUrls: ['./approval-pending-table.component.less']
})
export class ApprovalPendingTableComponent implements OnInit {

  @Input()
  status: number;


  selectedNameContaining: string = 'nickname';
  nameContainingKeyword: string = '';

  displayData = [];
  loading: boolean = false;
  pageIndex: number = 1;

  total: number = 0;

  dateRange = [];

  filterOptions: {};

  previewSrc: string = '';

  reason: string = '';

  constructor(
    private userApproval$: UserApprovalService,
    private _message: NzMessageService,
    private _modal: NzModalService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.userApproval$.changeStatus.subscribe(result => {
      this.searchData();
    })
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.userApproval$.getApprovingList(pageIndex, 10).subscribe( result => {
      this.loading = false;
      this.total = result[0].totalApproval? result[0].totalApproval: 0;
      this.displayData = result;
    }, error1 => {
      this.loading = false;
      this._message.error(error1.error)
    })
  }

  filter() {
    let startTime = 0;
    this.total = 0;
    let endTime = Math.floor(new Date().getTime() / 1000);
    if (this.dateRange.length == 2) {
      startTime = Math.floor(new Date(this.dateRange[0]).getTime() / 1000);
      endTime = Math.floor(new Date(this.dateRange[1]).getTime() / 1000)
    }
    this.displayData = [];
    this.loading = true;
    this.filterOptions = {
      searchTimeType: 'createdTime',
      starTime: startTime,
      endTime: endTime,
      searchType: this.selectedNameContaining,
      searchParameter: this.nameContainingKeyword
    };
    this.userApproval$.filterApprovingList(this.pageIndex, 10, this.filterOptions).subscribe( result => {
      this.loading = false;
      this.total = result[0].totalApproval? result[0].totalApproval: 0;
      this.displayData = result;
    }, error1 => this._message.error(error1.error))
  }

  approvalSuccess(userId: string, template: TemplateRef<{}>) {
    const modal = this._modal.create({
      nzTitle: '填写备注',
      nzContent: template,
      nzOnOk: () => {
        this.userApproval$.updateUserApproval('approved', this.reason, userId).subscribe(result => {
          this.notification.success('认证成功！', '');
          let i;
          this.userApproval$.changeStatus.subscribe(value => i = value);
          this.userApproval$.changeStatus.next(i + 1);
          this.reason = '';
        }, error1 => this.notification.error('发生错误！', `${error1.error}`))
      }
    })
  }

  approvalFailed(userId: string, template: TemplateRef<{}>) {
    const modal = this._modal.create({
      nzTitle: '填写备注',
      nzContent: template,
      nzOnOk: () => {
        this.userApproval$.updateUserApproval('approve_fail', this.reason, userId).subscribe(result => {
          this.notification.success('认证失败！', '');
          let i;
          this.userApproval$.changeStatus.subscribe(value => i = value);
          this.userApproval$.changeStatus.next(i + 1);
          this.reason = ''
        }, error1 => this.notification.error('发生错误！', `${error1.error}`))
      }
    })
  }

  openPreviewModal(src: string, template: TemplateRef<{}>) {
    this.previewSrc = src;
    const modal = this._modal.create({
      nzTitle: '查看大图',
      nzContent: template,
      nzFooter: null
    });
    modal.afterClose.subscribe(() => {
      this.previewSrc = '';
    })
  }

}
