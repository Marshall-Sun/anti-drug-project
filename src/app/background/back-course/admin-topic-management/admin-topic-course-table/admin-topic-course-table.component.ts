import { Component, OnInit } from '@angular/core';
import {AdminTopicCourseService} from '../../../../service/admin-topic-course/admin-topic-course.service';
import {NzMessageService, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UserInfoViewModalComponent} from '../../../../core/modal/user-info-view-modal/user-info-view-modal.component';

@Component({
  selector: 'app-admin-topic-course-table',
  templateUrl: './admin-topic-course-table.component.html',
  styleUrls: ['./admin-topic-course-table.component.less']
})
export class AdminTopicCourseTableComponent implements OnInit {

  postType: string = '';
  attribute: string = '';
  title: string = 'title';
  keyWord: string = '';
  creator: string = '';

  dataList = [];
  displayData = [];
  loading: boolean = false;
  total: number = 0;
  totalPage: number;
  pageIndex: number = 1;

  filterOptions = {
    postType: '',
    attribute: '',
    title: '',
    creator: '',
    keyWord: '',
  };
  checkOption = [];

  // 全选功能
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  mapOfEllipsis: { [key: string]: boolean } = {};

  constructor(
    private adminTopicCourseService$: AdminTopicCourseService,
    private _notification: NzNotificationService,
    private _modalService: NzModalService
  ) { }

  ngOnInit() {
    this.searchData()
  }
  // 搜索
  filterPost() {
    this.displayData = [];
    this.loading = true;
    this.filterOptions = {
      postType: this.postType,
      attribute: this.attribute,
      title: this.title,
      creator: this.creator,
      keyWord: this.keyWord,
    };
    this.pageIndex = 1;
    this.adminTopicCourseService$.getPostList(1, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.data;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        this.mapOfEllipsis[item.id] = true;
        this.mapOfCheckedId[item.id] = false
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


  // 批量删除
  deleteData() {
    // 删除数据操作
    let deleteIdList = [];
    this.displayData.forEach(item => {
      if (this.mapOfCheckedId[item.id])
        deleteIdList.push(item.id)
    });
    this.isOperating = true;
    this.adminTopicCourseService$.deleteCourseThreadInBatch(deleteIdList).subscribe(result => {
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
    this.adminTopicCourseService$.getPostList(pageIndex, 10, this.filterOptions).subscribe(result => {
      this.loading = false;
      this.total = result.data.total;
      this.totalPage = Math.ceil(this.total / 10);
      this.dataList = result.data.data;
      this.displayData = this.dataList;
      this.displayData.forEach(item => {
        this.mapOfEllipsis[item.id] = true;
        this.mapOfCheckedId[item.id] = false
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
    this.displayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.displayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.displayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
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

  // 跳转到课程话题页面
  navigateToTopic(id: string) {
    window.open(``, '_blank')
  }

  // 展开和折叠信息
  unfoldOrFoldContent(id: string) {
    this.mapOfEllipsis[id] = !this.mapOfEllipsis[id];
  }

  // 加精
  setElaborate(item: any, data: any) {
    if (data) {
      this._modalService.confirm({
        nzTitle: '是否设置为精品话题？',
        nzOnOk: () => {
          this.adminTopicCourseService$.setCourseThreadElite(item.id).subscribe(result => {
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
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    } else {
      this._modalService.confirm({
        nzTitle: '是否取消加精？',
        nzOnOk: () => {
          this.adminTopicCourseService$.cancelCourseThreadElite(item.id).subscribe(result => {
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
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    }

  }

  // 置顶
  setTop(item: any, data: any) {
    if (data) {
      this._modalService.confirm({
        nzTitle: '是否置顶该话题？',
        nzOnOk: () => {
          this.adminTopicCourseService$.setCourseThreadTop(item.id).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '设置置顶成功',
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
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    } else {
      this._modalService.confirm({
        nzTitle: '是否取消置顶该话题？',
        nzOnOk: () => {
          this.adminTopicCourseService$.cancelCourseThreadTop(item.id).subscribe(result => {
            this.searchData();
            this._notification.create(
              'success',
              '取消置顶成功',
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
        },
        nzOnCancel: () => {
          this.searchData()
        }
      })
    }
  }

  delete(id: string): void {
    this._modalService.confirm({
      nzTitle: '是否要删除该条记录？',
      nzOnOk: () => {
        this.adminTopicCourseService$.deleteCourseThread(id).subscribe(result => {
          if (this.displayData.length === 1) {
            this.pageIndex --;
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
