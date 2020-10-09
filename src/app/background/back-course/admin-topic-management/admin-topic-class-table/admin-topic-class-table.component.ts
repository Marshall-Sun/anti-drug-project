import { Component, OnInit } from '@angular/core';
import {AdminTopicClassService} from '../../../../service/admin-topic-class/admin-topic-class.service';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserInfoViewModalComponent} from '../../../../core/modal/user-info-view-modal/user-info-view-modal.component';
import {AdminTopicCourseService} from '../../../../service/admin-topic-course/admin-topic-course.service';

@Component({
  selector: 'app-admin-topic-class-table',
  templateUrl: './admin-topic-class-table.component.html',
  styleUrls: ['./admin-topic-class-table.component.less']
})
export class AdminTopicClassTableComponent implements OnInit {

  title: string = '';
  inputValue: string = '';
  keyWord: string = '';
  creator: string = '';

  dataList = [];
  displayData = [];
  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  filterOptions = {
    keyWord: '',
    title: '',
    creator: '',
  };
  checkOption = [];

  // 全选功能
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  mapOfEllipsis: { [key: string]: boolean } = {};

  constructor(
    private adminTopicClassService$: AdminTopicCourseService,
    private _notification: NzNotificationService,
    private _modalService: NzModalService
  ) { }

  ngOnInit() {
    this.searchData()
  }
  // 搜索
  filterClass() {
    this.displayData = [];
    this.loading = true;
    this.filterOptions = {
      keyWord: this.keyWord,
      title: this.title,
      creator: this.creator,
    };
    this.pageIndex = 1;
    this.adminTopicClassService$.getClassroomThreadList(1, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.backGroundThreadList;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        this.mapOfEllipsis[item.threadId] = true;
        this.mapOfCheckedId[item.threadId] = false
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    })
  }

  navigateTo(url: string) {
    window.open(url, '_blank')
  }

  // 批量删除
  deleteData() {
    let deleteIdList = [];
    this.displayData.forEach(item => {
      if (this.mapOfCheckedId[item.threadId])
        deleteIdList.push(item.threadId)
    });
    this.isOperating = true;
    this.adminTopicClassService$.deleteClassThreadInBatch(deleteIdList).subscribe(result => {
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
  searchData(pageIndex: number = this.pageIndex) {
    this.displayData = [];
    this.loading = true;
    this.adminTopicClassService$.getClassroomThreadList(pageIndex, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.backGroundThreadList;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        this.mapOfEllipsis[item.threadId] = true;
        this.mapOfCheckedId[item.threadId] = false
      });
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    }, error1 => {
      this.loading = false;
      this._notification.create(
        'error',
        '发生错误！',
        `${error1.error}`)
    })
  }

  // 全选功能
  checkAll(value: boolean): void {
    this.displayData.forEach(item => (this.mapOfCheckedId[item.threadId] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.displayData
      .every(item => this.mapOfCheckedId[item.threadId]);
    this.isIndeterminate =
      this.displayData.some(item => this.mapOfCheckedId[item.threadId]) &&
      !this.isAllDisplayDataChecked;
  }
  // 跳转到班级话题页面
  navigateToTopic(id: string) {
    window.open(``, '_blank')
  }

  // 展开和折叠信息
  unfoldOrFoldContent(id: string) {
    this.mapOfEllipsis[id] = !this.mapOfEllipsis[id];
  }
  // 打开个人介绍模态框
  openUserIntro(id: string) {
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


  delete(id: string): void {
    let deleteList = [];
    deleteList.push(id);
    this._modalService.confirm({
      nzTitle: '是否要删除该条记录？',
      nzOnOk: () => {
        this.adminTopicClassService$.deleteClassThreadInBatch(deleteList).subscribe(result => {
          if (this.displayData.length == 1) {
            this.pageIndex -- ;
          }
          this.searchData();
          this._notification.create(
            'success',
            '删除成功！',
            ''
          )
        }, error1 => {
          this._notification.create(
            'error',
            '发生错误！',
            `${error1.error}`
          )
        })
      }
    })
  }

}
