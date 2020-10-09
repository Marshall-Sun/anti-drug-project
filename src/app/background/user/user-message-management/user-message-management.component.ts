import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserMessageManagementService} from '../../../service/userMessageManagement/user-message-management.service';
import {UserInfoViewModalComponent} from '../../../core/modal/user-info-view-modal/user-info-view-modal.component';
@Component({
  selector: 'app-user-message-management',
  templateUrl: './user-message-management.component.html',
  styleUrls: ['./user-message-management.component.less']
})
export class UserMessageManagementComponent implements OnInit {

  dateRange = [];
  inputSendName: string = '';
  inputKey: string = '';

  dataList = [];
  displayData = [];
  loading = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  filterOptions = {
    starTime: 0,
    endTime: 0,
    sendName: '',
    KEY: '',
  };
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;


  mapOfEllipsis: { [key: string]: boolean } = {};
  constructor(
    private userMessageManagementService$: UserMessageManagementService,
    private _notification: NzNotificationService,
    private _modalService: NzModalService
  ) {
  }
  ngOnInit() {
    this.searchData();
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.userMessageManagementService$.getMessageList(pageIndex, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data[0].totalMessages? result.data[0].totalMessages: 0;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        this.mapOfEllipsis[item.messageId] = true;
        this.mapOfCheckedId[item.messageId] = false
      })
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    });
    this.isAllDisplayDataChecked = false;
    this.isIndeterminate = false;
  }
  filterRecord() {
    let startTime = 0;
    let endTime: number = Math.floor(new Date().getTime() / 1000);
    if (this.dateRange.length == 2) {
      startTime = Math.floor(new Date(this.dateRange[0]).getTime() / 1000);
      endTime = Math.floor(new Date(this.dateRange[1]).getTime() / 1000);
    }
    this.displayData = [];
    this.loading = true;
    this.filterOptions = {
      starTime: startTime,
      endTime: endTime,
      sendName: this.inputSendName,
      KEY: this.inputKey,
    };
    this.userMessageManagementService$.getMessageList(1, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data[0].totalMessages? result.data[0].totalMessages: 0;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        this.mapOfEllipsis[item.messageId] = true;
        this.mapOfCheckedId[item.messageId] = false
      })
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    });
    this.isAllDisplayDataChecked = false;
    this.isIndeterminate = false;
  }
  checkAll(value: boolean): void {
    this.displayData.forEach(item => (this.mapOfCheckedId[item.messageId] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.displayData
      .every(item => this.mapOfCheckedId[item.messageId]);
    this.isIndeterminate =
      this.displayData.some(item => this.mapOfCheckedId[item.messageId]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.dataList.filter(item => this.mapOfCheckedId[item.messageId]).length;
  }
  deleteData(): void {
    // 删除数据操作
    this.isOperating = true;
    let idList = [];
    this.displayData.forEach(item => {
      if (this.mapOfCheckedId[item.messageId]) {
        idList.push(item.messageId)
      }
    });
    this.userMessageManagementService$.deleteMessage(idList).subscribe(result => {
      this.isOperating = false;
      if (this.isAllDisplayDataChecked && this.pageIndex === this.totalPage) {
        this.pageIndex --;
      }
      this.searchData();
      this._notification.create(
        'success',
        '删除成功！',
        ''
      )
    }, error1 => {
      this.isOperating = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`
      )
    });
  }

  unfoldOrFoldContent(id: string) {
    this.mapOfEllipsis[id] = !this.mapOfEllipsis[id];
  }

  showPersonalInfo(id: string) {
    const modal = this._modalService.create({
      nzTitle: '个人详细信息',
      nzContent: UserInfoViewModalComponent,
      nzComponentParams: {
        userId: id
      },
      nzWidth: 600,
      nzFooter: null
    })
  }
}
