import { Component, OnInit } from '@angular/core';
import {GroupTopicManagementService} from '../../../../service/group-topic-management/group-topic-management.service';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserInfoViewModalComponent} from '../../../../core/modal/user-info-view-modal/user-info-view-modal.component';

@Component({
  selector: 'app-group-topic',
  templateUrl: './group-topic.component.html',
  styleUrls: ['./group-topic.component.less']
})
export class GroupTopicComponent implements OnInit {
  selectedStateFilterValue   = '';
  inputGroup: string = '';
  creator: string = '';
  keyword: string = '';
  selectedAttributeFilterValue = '';

  dataList = [];
  displayData = [];
  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  filterOptions = {
    state: '',
    groupName: '',
    keyword: '',
    creator: '',
    attribute: ''
  };
  checkOption = [];
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  mapOfCheckedId: { [threadId: string]: boolean } = {};


  constructor(
    private groupTopicManagementService$: GroupTopicManagementService,
    private  _notification: NzNotificationService,
    private  _modalService: NzModalService
  ) { }

  ngOnInit() {
    this.searchData();
  }

  navigateTo(url: string) {
    window.open(url, '_blank')
  }

  viewUserInfo(id: string) {
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


  // 搜索

  filterTopic() {
    this.displayData = [];
    this.loading = true;
    this.filterOptions = {
      state: this.selectedStateFilterValue,
      groupName: this.inputGroup,
      keyword: this.keyword,
      creator: this.creator,
      attribute: this.selectedAttributeFilterValue
    };
    this.pageIndex = 1;
    this.groupTopicManagementService$.getTopicList(1, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.data;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        const id = item.threadId;
        this.mapOfCheckedId[item.threadId] = false
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => this._notification.error(
      '发生错误！',
      `${error1.error}`))
  }
  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.groupTopicManagementService$.getTopicList(pageIndex, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.data;
      this.displayData = this.dataList;

      this.displayData.forEach(item => {
        const id = item.threadId;
        this.mapOfCheckedId[item.threadId] = false;
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => this._notification.error(
      '发生错误！',
      `${error1.error}`))
  }
  checkAll(value: boolean): void {
    this.displayData.forEach(item => this.mapOfCheckedId[item.treadId] = value);
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.displayData
      .every(item => this.mapOfCheckedId[item.treadId]);
    this.isIndeterminate =
      this.displayData.some(item => this.mapOfCheckedId[item.treadId]) &&
      !this.isAllDisplayDataChecked;
  }
  operateData(): void {
    // 删除数据操作
    let deleteIdList = [];
    console.log(this.displayData);
    console.log(this.mapOfCheckedId);
    this.displayData.forEach(item => {
      console.log(this.mapOfCheckedId[item.threadId]);
      if (this.mapOfCheckedId[item.treadId]) {
        deleteIdList.push(item.treadId)
      }
    });
    console.log(deleteIdList);
    this.isOperating = true;
    this.groupTopicManagementService$.deleteInBatch(deleteIdList).subscribe(result => {
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
    })
  }

  // 修改置顶加精属性
  setElite(id: string, data: any) {
    if (data) {
          this.groupTopicManagementService$.setElite(id).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '设置成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
    } else {
          this.groupTopicManagementService$.setNotElite(id).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '取消成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
        }
  }


  setStick(id: string, data: any) {
    if (data) {
          this.groupTopicManagementService$.setStick(id).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '设置成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
    } else {
          this.groupTopicManagementService$.setNotStick(id).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '取消成功！',
              ''
            )
          }, error1 => {
            this.searchData();
            this._notification.create(
              'error',
              '发生错误！',
              `${error1.error}`
            )
          })
        }
  }
  // 关闭小组
  closeGroup(id: any){
    this._modalService.confirm({
      nzTitle: '是否关闭该小组？',
      nzOnOk: () => {
        this.groupTopicManagementService$.closeThread(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '关闭成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

  // 开放小组
  openGroup(id: string) {
    this._modalService.confirm({
      nzTitle: '是否开放该小组？',
      nzOnOk: () => {
        this.groupTopicManagementService$.openThread(id).subscribe(result => {
          this.searchData();
          this._notification.success(
            '开放成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

  // 删除话题
  delete(id: string) {
    this._modalService.confirm({
      nzTitle: '是否删除该话题？',
      nzOnOk: () => {
        this.groupTopicManagementService$.deleteThread(id).subscribe(result => {
          if (this.displayData.length == 1) {
            this.pageIndex --;
          }
          this.searchData();
          this._notification.success(
            '删除成功！',
            ''
          )
        }, error1 => {
          this._notification.error(
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }
}
